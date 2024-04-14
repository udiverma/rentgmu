const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(password, name, id, email, phone) {
        this.email = email;
        this.username = this.generateUsername(email);
        this.password = this.setPassword(password); // Use synchronous hashing
        this.name = name;
        this.id = id;
        this.phone = phone;
    }

    generateUsername(email) {
        const username = email.split('@')[0];
        return username;
    }

    setPassword(password) {
        return bcrypt.hashSync(password, saltRounds); // Synchronous password hashing
    }

    // Getters
    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }

    // Setters
    setUsername(username) {
        this.username = username;
    }

    setName(name) {
        this.name = name;
    }

    setId(id) {
        this.id = id;
    }

    setEmail(email) {
        this.email = email;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    // Convert user data to CSV format
    toCSV() {
        return `${this.username},${this.password},${this.name},${this.id},${this.email},${this.phone}\n`;
    }
}

// Function to check if email already exists
function checkEmailExists(email, filename, callback) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error('Error reading from CSV file', err);
            return callback(err);
        }
        const exists = data.split('\n').some(line => line.includes(`,${email},`));
        callback(null, exists);
    });
}

// Function to check password for a given username
function verifyPassword(username, password, filename, callback) {
    const filePath = path.join(__dirname, filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const users = csvParser(data, {
            columns: true,
            skip_empty_lines: true
        });

        const user = users.find(u => u.username === username);
        if (!user) {
            return callback(null, false, 'User not found');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        callback(null, isMatch, isMatch ? 'Password is correct' : 'Password is incorrect');
    } catch (err) {
        callback(err);
    }
}

// Function to write user data to a CSV file
function writeUserToCSV(user, filename) {
    checkEmailExists(user.getEmail(), filename, (err, exists) => {
        if (err) {
            console.error('Error checking email', err);
            return;
        }
        if (exists) {
            console.error('Signup failed: Email already exists');
            return;
        }

        const filePath = path.join(__dirname, filename);
        fs.appendFile(filePath, user.toCSV(), (err) => {
            if (err) {
                console.error('Error writing to CSV file', err);
            } else {
                console.log('User added to CSV file successfully.');
            }
        });
    });
}

// At the end of your userManagement.js file
module.exports = {
    User,
    checkEmailExists,
    verifyPassword,
    writeUserToCSV
};