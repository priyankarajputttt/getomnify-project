const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    schedules: [String],
    event: String,
    start_time: String,
    end_time: String,
    week_day: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema); 