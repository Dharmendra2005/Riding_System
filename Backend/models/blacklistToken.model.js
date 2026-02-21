const mongoose = require("mongoose");

const blackTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires : 86400//24 hours 
    }
})


module.exports = mongoose.models.blacktoken || mongoose.model("blacktoken", blackTokenSchema);