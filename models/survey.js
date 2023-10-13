const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    role: String,
    rank: String
});

module.exports = mongoose.model('Survey', surveySchema);