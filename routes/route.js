const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const eventController = require('../controller/event.controller');

const middleware = require('../middleware/auth.middleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.post('/event', middleware.auth, eventController.createEvent);

router.get('/shedules', middleware.auth, eventController.getSchedules);

router.delete('/deleteEvent', middleware.auth, eventController.deleteEvent);

module.exports = router; 