const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

//MONGOOSE CONNECTION
const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB");

        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

startServer();

//JSON WEB TOKEN JWT



//AUTHENTICATION
//AUTHORIZATION



