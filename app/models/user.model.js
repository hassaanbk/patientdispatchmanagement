const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role: {
        type: String,
        enum: ['patient', 'nurse']
    },
    token: {
        type: String
    }
});


UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
}).set(function(fullName) {
    const name = fullName.split(' ');
    this.firstName = name[0];
    this.lastName = name[1];
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('User', UserSchema);