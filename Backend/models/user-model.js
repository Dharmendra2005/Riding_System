const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullName : {
        firstName:{
            type : String,
            requiered : true,
            minLength : [3, 'First name should be at least 3 character long']
        },
        lastName:{
            type : String,
            requiered : true,
            minLength : [3, 'Last name should be at least 3 character long']
        }
    },
    email: {
        type : String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be atleast 5 character long']
    },
    password : {
        type : String,
        select: false,
        required: true,
    },

    socketId : {
        type : String
    }
});

//to generate token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_KEY, {expiresIn : '1h'});
    return token;
}

//to compare  password
userSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//to hashing password
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


module.exports = mongoose.models.user || mongoose.model("user", userSchema);