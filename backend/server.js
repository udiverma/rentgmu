const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parse');
const cors = require('cors');
const app = express();
const PORT = 3001;
const userManagement = require('./userManagement'); 

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
        const newUser = new userManagement.User(password, name, Date.now().toString(), email, phone);
        newUser.setPassword(password); // This should ideally be synchronous or handled differently
        userManagement.writeUserToCSV(newUser, '/data/user/users.csv');
        res.json({ success: true, message: 'User registered successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});