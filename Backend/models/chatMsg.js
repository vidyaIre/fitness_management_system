const mongoose = require('mongoose');
const chatMsgSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', chatMsgSchema);