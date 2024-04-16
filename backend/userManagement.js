const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const csv = require('csv-parse');

class User {
    constructor(password, name, id, email, phone) {
        this._email = email;
        this._username = this.generateUsername(email);
        this._password = this.setPassword(password); // Use synchronous hashing
        this._name = name;
        this._id = id;
        this._phone = phone;
    }

    generateUsername(email) {
        const username = email.split('@')[0];
        return username;
    }

    setPassword(password) {
        return bcrypt.hashSync(password, saltRounds); // Synchronous password hashing
    }

    // Getters
    get email() {
        return this._email;
    }

    get username() {
        return this._username;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get phone() {
        return this._phone;
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
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error('Error reading from CSV file', err);
            return callback(err);
        }
        
        csv.parse(data, {
            columns: true,
            skip_empty_lines: true
        }, (err, users) => {
            if (err) {
                console.error('Error parsing CSV data', err);
                return callback(err);
            }
            
            const user = users.find(u => u.Username.toLowerCase() === username.toLowerCase());
            if (!user) {
                return callback(null, false, 'User not found');
            }
            
            bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords', err);
                    return callback(err);
                }
                callback(null, isMatch, isMatch ? 'Password is correct' : 'Password is incorrect');
            });
        });
    });
}

// Function to write user data to a CSV file
function writeUserToCSV(user, filename) {
    checkEmailExists(user.email, filename, (err, exists) => {
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
// Function to retrieve user details by username
function getUserDetailsByUsername(username, filename, callback) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error('Error reading from CSV file', err);
            return callback(err);
        }

        csv.parse(data, {
            columns: true,
            skip_empty_lines: true
        }, (err, users) => {
            if (err) {
                console.error('Error parsing CSV data', err);
                return callback(err);
            }
            
            const user = users.find(u => u.Username.toLowerCase() === username.toLowerCase());
            if (!user) {
                return callback(null, null, 'User not found');
            }
            
            const userDetails = {
                username: user.Username,
                name: user.Name,
                id: user.ID,
                email: user.Email,
                phone: user.Phone
            };

            callback(null, userDetails);
        });
    });
}

// At the end of your userManagement.js file
module.exports = {
    User,
    checkEmailExists,
    verifyPassword,
    writeUserToCSV,
    getUserDetailsByUsername
};