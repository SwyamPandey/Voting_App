const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Election = require('../models/election');
const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: false
    },
    password: { type: String, required: true },
    address: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true, match: /^\d{12}$/ },
    // isVoted: { type: Boolean, default: false },
    votedElections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Election' }],
    mobile: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    age:{
        type: Number,
        required: true
    }
});

const bcrypt = require('bcrypt');

userSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(person.password, salt);
        person.password = hash;
        next();
    } catch (error) {
        return next(error); // ✅ fixed: error passed correctly
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


module.exports = mongoose.model('User', userSchema);
