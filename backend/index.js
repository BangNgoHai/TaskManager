
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Keep the original route imports
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
// Add the new task route import
const taskRoutes = require('./routes/taskRoutes');
const middlewareControllers = require('./controllers/middlewareControllers');

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Keep the original routes
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
// Add the new task route
app.use('/v1/tasks', middlewareControllers.verifyToken, taskRoutes);

// Keep the original server start and MongoDB connection logic
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
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
