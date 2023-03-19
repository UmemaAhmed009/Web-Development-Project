const mongoose = require('mongoose');
const User = require("../models/user");
const Role = require("../models/role");

const user_role_schema = new mongoose.Schema({
    _id:
    {
        type: Number,
        required: true
    },
    user_id:
    {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'User'
    },
    role_id:
    {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Role'
    }
});

module.exports = mongoose.model("User_Role", user_role_schema);