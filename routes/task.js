const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');


router.get('/', (req, res, next) => {
    const tasks = Task.find().then(documents => {
        res.status(200).json({
            message: 'Found all tasks.',
            tasks: documents
        });
    });
    res.render('/task/tasks', {tasks});
});

router.get('/:id', (req, res, next) => {
    const task = Task.find(t => t._id === req.params.id)
        .then(documents => {
            res.status(200).json({
                message: 'Found the task by the right ID.',
                task: documents
            });
        });
    res.render('task/task', {task});
});

router.get('/add-task', (req, res, next) => {
    res.render('task/add-task');
});

router.post('/add-task', (req, res, next) => {
    const task = new Task({
        patientName: req.body.patientName,
        doctorName: req.body.doctorName,
        task: req.body.task,
        description: req.body.description,
        owner: req.body.owner
    });
    task.save().then(result => {
        res.status(201).json({
            message: 'Task created successfully.',
            taskId: result._id
        });
    });
});


module.exports = router;