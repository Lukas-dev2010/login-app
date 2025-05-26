const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    geld: {
        type: Number,
        default: 10000
    },
});

module.exports = mongoose.model('User', UserSchema);