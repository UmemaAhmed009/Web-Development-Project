const mongoose = require('mongoose');
const Unit = require("../models/unit");

const lesson_schema = new mongoose.Schema({
    _id:
    {
        type: Number,
        required: true
    },
    unit_id:
    {
        type: mongoose.Schema.Types.Number ,
        required: true,
        ref: 'Unit'
    },
    lesson_name:
    {
        type: String,
        required: true,
    },
    subject_id:{
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Subject'
    }
})
module.exports = mongoose.model("Unit", unit_schema);