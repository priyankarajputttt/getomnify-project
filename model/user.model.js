const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 