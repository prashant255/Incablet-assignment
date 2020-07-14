const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(age) {
            if (age<0)
                throw new Error('Age must be positive number')
        }
    },
    date: {
        type: Date
    },
    gender: {
        type: String,
        default: "male"
    },
    status: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
})

module.exports = User