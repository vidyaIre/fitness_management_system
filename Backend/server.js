const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const userRoute = require('./routes/usrRoute');
app.use('/api/user', userRoute);
const workoutRoute = require('./routes/workoutRoute');
app.use('/api/workout', workoutRoute);
const nutritionRoute = require('./routes/nutritionRoute');
app.use('/api/nutrition', nutritionRoute);
const sessionRoute = require('./routes/sessionRoute');
app.use('/api/session', sessionRoute);

app.get('/', (req, res) => {
    res.send('Fitness Management System is running....');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

