const express = require('express');
const router = express.Router();
const Appointment = require('./../models/Appointments');

router.get('/', (req, res, next) => {
    const appointments = Appointment.find().then(documents => {
        res.status(200).json({
            message: 'Appointments were found successfully',
            appointments: documents
        });
    });
    res.render('appointment/appointments', {appointments});
});

router.get('/:id', (req, res, next) => {
    const appointment = Appointment.find(a => a._id === req.params.id)
        .then(documents => {
            res.status(200).json({
                message: 'Found the appointment by the right ID',
                appointment: documents
            });
        });
    res.render('appointment/appointment', {appointment});
});

router.get('/add-appointment', (req, res, next) => {
    res.render('appointment/add-appointment');
});

router.post('/', (req, res, next) => {
    const appointment = new Appointment({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        color: req.body.color,
        owner: req.body.owner
    });
    appointment.save().then(result => {
        res.status(201).json({
            message: 'Appointment created successfully.',
            appointmentId: result._id
        });
    });
});

module.exports = router;