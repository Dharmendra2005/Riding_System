const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECT); 
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectToDB;