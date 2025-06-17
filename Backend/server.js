const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Message = require('./models/chatMsg');
const http = require('http');

//const Payment = require('./models/paymentModel');
const dotenv = require('dotenv');

const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

const server = http.createServer(app);
app.use(cors());
app.use(express.json());

connectDB();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Replace with your frontend URL
        methods: ["GET", "POST"]
    }
});




const userRoute = require('./routes/usrRoute');
app.use('/api/user', userRoute);
const workoutRoute = require('./routes/workoutRoute');
app.use('/api/workout', workoutRoute);
const nutritionRoute = require('./routes/nutritionRoute');
app.use('/api/nutrition', nutritionRoute);
const sessionRoute = require('./routes/sessionRoute');
app.use('/api/session', sessionRoute);
const paymentRoute = require('./routes/paymentRoute');
const { type } = require('os');
app.use('/api/payment', paymentRoute);

//let chatHistory = [];
io.on('connection', (socket) => {
    console.log('socket connected: ', socket.id);

    socket.on('sendMessage', async (data) => {
        console.log("Message data received:", data);
       
        try {
             const newMessage = new Message(data);
           const savedMessage = await newMessage.save();
            console.log('Message saved to db :', savedMessage);
            io.emit('receiveMessage',savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});



app.get('/messages', async (req, res) => {
    console.log('Fetching messages...');
    try {
        console.log("chat opening...");
        const messages = await Message.find(); // Fetch the last 100 messages
        console.log("message from chat", messages);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
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

