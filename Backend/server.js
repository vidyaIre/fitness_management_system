const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const connectDB = require('./config/db');
const { connect } = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) =>{
    res.send('Fitness Management System is running....');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

