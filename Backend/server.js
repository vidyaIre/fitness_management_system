const express = require('express');
const Payment = require('./models/paymentModel');
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
const paymentRoute = require('./routes/paymentRoute');
app.use('/api/payment', paymentRoute);



app.get('/', (req, res) => {
    res.send('Fitness Management System is running....');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
// app.get('/test-payment', async (req, res) => {
//     try {
//         const testPayment = new Payment({
//             user: '68186089777b577576286ea1',
//             amount: 1000,
//             paymentMethod: 'stripe',
//             transactionId: 'test_transaction_123',
//             paymentStatus: 'completed'
//         });

//         const savedPayment = await testPayment.save();
//         res.send('Payment saved: ' + savedPayment);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

