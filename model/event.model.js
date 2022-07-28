const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    start_time: String,
    end_time: String,
    week_day: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema); 