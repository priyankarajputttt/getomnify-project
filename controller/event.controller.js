const eventSchema = require('../model/event.model');
const scheduleSchema = require('../model/schedule.model');
const moment = require('moment');

const createEvent = async (req, res) => {
    const data = req.body;

    let start = moment();
    let end = moment().add(90, 'd');

    var schedule = [];
    // Get "next" monday
    let tmp = start.clone().day(data.week_day);
    if (tmp.isAfter(start, 'd')) {
        schedule.push(tmp.format('YYYY-MM-DD'));
    }
    while (tmp.isBefore(end)) {
        tmp.add(7, 'days');
        schedule.push(tmp.format('YYYY-MM-DD'));
    }

    data.email = req.email;

    const scheduleObj = {
        schedules: schedule,
        event: data.event,
        start_time: data.start_time,
        end_time: data.end_time,
        email: data.email
    }
    try {
        const dataRes = await eventSchema.create(data);
        await scheduleSchema.create(scheduleObj);
        return res.status(201).send({
            status: true,
            message: 'Event created successfully !',
            data: dataRes
        });
    }
    catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({
                status: false,
                message: 'Duplicate event'
            });
        }
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

const getSchedules = async (req, res) => {
    const token = req.query.token;

    const schedulesRes = await scheduleSchema.find({
        email: req.email
    });

    if (!schedulesRes) {
        return res.status(404).send({
            status: false,
            message: 'Event not found'
        });
    }
    return res.status(200).send({
        status: true,
        message: 'Event fuound',
        data: schedulesRes
    });
}

const deleteEvent = async (req, res) => {
    const data = req.body;
    try {
        const deleteEvent = await eventSchema.deleteOne(data);
        const deleteSchedule = await scheduleSchema.deleteOne(data);
        if (deleteEvent.deletedCount) {
            return res.status(200).send({
                status: true,
                message: 'Delete success'
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    createEvent,
    getSchedules,
    deleteEvent
}