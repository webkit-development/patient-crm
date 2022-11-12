const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    title: {
        type: String,
        minLength: [3, 'Need to have a title of 3 or more characters.'],
        maxLength: [50, 'Title cannot be more than 50 characters.'],
        required: true
    },
    description: {
        type: String,
        minLength: [5, 'The minimum length for description needs to be at least 5'],
        maxLength: [500, 'The max length for description is 500'],
        required: true
    },
    startDate: {
       type: Date,
       min: '2021-01-01',
       max: '2040-12-31'
    },
    endDate: {
        type: Date,
        min: '2021-01-01',
        max: '2040-12-31'
    },
    color: {
        type: String,
        default: 'bg-gradient-info'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);