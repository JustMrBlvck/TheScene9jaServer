const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining User Schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    // added user type
    role: {
        type: String,
        enum: [
            'Admin',
            'Author',
            'Reader'
        ],
        default: 'Reader'
    },

    // added bio
    bio: {
        type: String,
        trim: true
    },

    // added profile picture
    profilePicture: {
        type: String
    }
}, { timestamps: true });

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
