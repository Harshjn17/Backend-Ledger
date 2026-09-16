const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db");
    } catch (error) {
        console.log("Database error: ", error);
    }
}

module.exports = connectDB