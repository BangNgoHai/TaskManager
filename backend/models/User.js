const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    admin:{
        type: Boolean,
        default: false,
    }
}, { timestamps: true });   //When User is created, the timestamps will be added to the database

const User = mongoose.model('User', userSchema);

module.exports = User;