const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [50, 'First name cannot be more than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
        minLength: [2, 'Last name must be at least 2 characters'],
        maxLength: [50, 'Last name cannot be more than 50 characters']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: [true, 'Username must be unique'],
        minLength: [2, 'Username must be at least 2 characters'],
        maxLength: [50, 'Username cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Email must be unique'],
        minLength: [2, 'Email must be at least 2 characters'],
        maxLength: [50, 'Email cannot be more than 50 characters'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        unique: [true, 'Password must be unique'],
        minLength: [4, 'Password must be at least 4 characters'],
        maxLength: [25, 'Username cannot be more than 25 characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    appointments: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, 'sldkhjdlksjlsjclskjxlskxcjskldjlskjdsalsh;sd292uu32929322u39', {
        expiresIn: '30d'
    });
};

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);