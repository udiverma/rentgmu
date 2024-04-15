const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parse');
const cors = require('cors');
const app = express();
const PORT = 3001;
const userManagement = require('./userManagement'); 
var id = 0;

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
    const { password, name, email, phone } = req.body;
    userManagement.checkEmailExists(email, '/data/user/users.csv', (err, exists) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error checking user email' });
        }
        if (exists) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        id += 1
        const newUser = new userManagement.User(password, name, id, email, phone);
        newUser.setPassword(password); // This should ideally be synchronous or handled differently
        userManagement.writeUserToCSV(newUser, '/data/user/users.csv');
        res.json({ success: true, message: 'User registered successfully' });
    });
});

app.post('/verify-password', (req, res) => {
    const { username, password } = req.body;
    userManagement.verifyPassword(username, password, '/data/user/users.csv', (err, isMatch, message) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error verifying password' });
        }
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Username or Password is incorrect' });
        }
        res.json({ success: true, message: 'Password verified successfully' });
    });
});

// Add this route to your server.js file
app.get('/user/:username', (req, res) => {
    const { username } = req.params;
    userManagement.getUserDetailsByUsername(username, '/data/user/users.csv', (err, userDetails, message) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error retrieving user data' });
        }
        if (!userDetails) {
            return res.status(404).json({ success: false, message: message });
        }
        res.json({ success: true, data: userDetails });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});