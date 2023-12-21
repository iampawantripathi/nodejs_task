const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: [String],
        default: [],
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;