import React, { useState, useEffect } from 'react';
import socket from '../config/socketConfig';
import { io } from 'socket.io-client'; // Ensure you have socket.io-client installed   
import '../ChatBox.css'; // Import your CSS file for styling
import axios from 'axios'; // Import axios for API requests

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [userName, setUserName] = useState(''); // Default username, can be changed later


    useEffect(() => {

        try {
            const storedUser = JSON.parse(localStorage.getItem('@user'));
            console.log("Stored user data:", storedUser?.firstName);
            if (storedUser && storedUser?.firstName) {
                setUserName(storedUser?.firstName);
                console.log("UserName set from storedUser:", storedUser?.firstName);
            }
            else {
                console.error("No user found in local storage");
            }
        } catch (error) {
            console.error("Error retrieving user from local storage:", error);
        }



        axios.get('http://localhost:5000/messages')
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));

        socket.on('receiveMessage', (data) => {
            console.log("Received message:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => socket.off('receiveMessage');

    }, []);
    const sendMessage = () => {
        if (!text.trim()) return; // Prevent sending empty messages
        const messageData = {
            userName,
            text,
            time: new Date()
        };
        console.log("Message data to send:", messageData);
        socket.emit('sendMessage', messageData);
        setText(''); // Clear input field after sending
    };
    return (
  <div className="chatbox-container">
    <div className="chatbox-header" style={{ color: '#0e0079' }}>ChatBox</div>

    <div className="chatbox-messages">
      {messages.map((msg, i) => (
        <div key={i} className="message">
          <strong>{msg.userName}</strong>: {msg.text}
        </div>
      ))}
    </div>

    <div className="chatbox-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={() => setMessages([])}>Clear</button>

    </div>
  </div>
);
}

export default ChatBox;
