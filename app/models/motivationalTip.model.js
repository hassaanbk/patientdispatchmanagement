const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotivationalTipSchema = new Schema({
    message: {
        type: String,
        required: [true, 'Motivational Message is required']
    }},
    {
        timestamps: true
    });

    module.exports = mongoose.model('MotivationalTip', MotivationalTipSchema);