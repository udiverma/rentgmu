const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const csv = require('csv-parse');
const { METHODS } = require('http');

class Listing {
    constructor(category, name, description, price, payment_methods, image, contact_display, owner_id, listing_id) {
        this._category = category;
        this._name = name;
        this._description = description;
        this._price = price;
        this._payment_methods = payment_methods;
        this._image = image;
        this._contact_display = contact_display;
        this._owner_id = owner_id;
        this._listing_id = listing_id;
    }

    // Getters
    get category() {
        return this._category;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get payment_methods() {
        return this._payment_methods;
    }

    get image() {
        return this._image;
    }

    get contact_display() {
        return this._contact_display;
    }

    get owner_id() {
        return this._owner_id;
    }

    get listing_id() {
        return this._listing_id;
    }

    // Setters
    set category(newCategory) {
        this._category = newCategory;
    }

    set name(newName) {
        this._name = newName;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    set payment_methods(newPaymentMethods) {
        this._payment_methods = newPaymentMethods;
    }

    set image(newImage) {
        this._image = newImage;
    }

    set contact_display(newContactDisplay) {
        this._contact_display = newContactDisplay;
    }

    set owner_id(newOwnerId) {
        this._owner_id = newOwnerId;
    }

    set listing_id(newListingId) {
        this._listing_id = newListingId;
    }

    toCSV() {
        return `${this.category},${this.name},${this.description},${this.price},${this.payment_methods.join(';')},${this.image},${this.contact_display},${this.owner_id},${this.listing_id}\n`;
    }
}

function verifyOwnership(username, listing_id, filename, callback) {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error('Error reading from CSV file', err);
            return callback(err);
        }
        
        csv.parse(data, {
            columns: true,
            skip_empty_lines: true
        }, (err, listings) => {
            if (err) {
                console.error('Error parsing CSV data', err);
                return callback(err);
            }
            
            const listing = listings.find(l => l.ListingID === listing_id);
            if (!listing) {
                return callback(null, false, 'Listing not found');
            }

            // Here we hash the given username and compare it with the stored owner_id
            bcrypt.hash(username, 10, (err, hash) => {
                if (err) {
                    console.error('Error hashing username', err);
                    return callback(err);
                }

                bcrypt.compare(hash, listing.OwnerID, (err, isMatch) => {
                    if (err) {
                        console.error('Error comparing owner ID', err);
                        return callback(err);
                    }
                    callback(null, isMatch, isMatch ? 'Ownership verified' : 'Ownership not verified');
                });
            });
        });
    });
}

function writeListingToCSV(listing, filename, callback) {
    const filePath = path.join(__dirname, filename);
    fs.appendFile(filePath, listing.toCSV(), (err) => {
        if (err) {
            console.error('Error writing to CSV file', err);
            callback(err);  // Notify the caller of the error
            return;
        }
        console.log('Listing added to CSV file successfully.');
        callback(null);  // Notify the caller of success, no error occurred
    });
}

module.exports = {
    Listing,
    verifyOwnership,
    writeListingToCSV
};