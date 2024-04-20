const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const csvParser = require('csv-parse');
const cors = require('cors');
const app = express();
const PORT = 3001;
const userManagement = require('./userManagement'); 
const listingManagement = require('./listingManagement');

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', (req, res) => {
    const { password, name, email, phone } = req.body;
    userManagement.checkEmailExists(email, '/data/user/users.csv', (err, exists) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error checking user email' });
        }
        if (exists) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        var id = bcrypt.hashSync(email.split('@')[0], saltRounds);
        var cryptPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = new userManagement.User(cryptPassword, name, id, email, phone);
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

app.post('/post-listing', (req, res) => {
    const { category, name, description, price, payment_methods, image, contact_display, owner_id, listing_id } = req.body;

    // Create a new listing instance
    const newListing = new listingManagement.Listing(category, name, description, price, payment_methods, image, contact_display, owner_id, listing_id);

    // Call writeListingToCSV to append the new listing to the CSV file
    listingManagement.writeListingToCSV(newListing, '/data/listing/listings.csv', (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error writing listing to CSV' });
        }
        res.json({ success: true, message: 'Listing posted successfully' });
    });
});

app.post('/verify-ownership', (req, res) => {
    const { username, listing_id } = req.body;
    listingManagement.verifyOwnership(username, listing_id, '/data/listing/listings.csv', (err, isMatch, message) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error verifying listing ownership' });
        }
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'You are not the listing owner!' });
        }
        res.json({ success: true, message: 'Listing ownership verified successfully' });
    });
});

// Export the app for testing
module.exports = app;

// Conditionally start the server if not required by a test
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}