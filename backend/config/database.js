const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("MongoDB Is Alive!!")
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDatabase;

