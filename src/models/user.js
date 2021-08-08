const mongoose = require('mongoose')
const validator = require('validator')
const bycript = require('bcryptjs')

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age msut be a positive number')
            }
        }
    }
})

userSchema.pre('save', async function (next) {
    // this gives us access to the individual user
    const user = this
    if (user.isModified('password')) {
        user.password = await bycript.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
