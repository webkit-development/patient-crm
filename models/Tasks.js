const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    task: {
        type: String,
        minLength: [3, 'Task needs to be 3 or more characters.'],
        maxLength: [100, 'Task needs to be 100 characters or less.'],
        required: true
    },
    description: {
        type: String,
        minLength: [10, 'Task description needs to be 10 or more characters.'],
        maxLength: [500, 'Task description cannot be more than 500 characters.'],
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Task', taskSchema);