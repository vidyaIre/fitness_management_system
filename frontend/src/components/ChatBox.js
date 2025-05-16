import React, { useState, useEffect } from 'react';
import socket from '../config/socketConfig';    
import '../ChatBox.css'; // Import your CSS file for styling

const ChatBox = () => {
    const [messages, setMessages] = useState([]);   
    const [newInput, setNewInput] = useState('');

    useEffect(() => {
        socket.on('chatHistory', (chatHistory) => {
            console.log("chat history", chatHistory);
            setMessages(Array.isArray(chatHistory) ? chatHistory : []);
        });

        socket.on('sendMessage', (sendMessage) => {
            setMessages((prevMessages) => [...prevMessages, sendMessage]);
        });

        return () => {
            socket.off('chatHistory');
            socket.off('sendMessage');
        };
    }, []);

    const handleSendMessage = () => {
        if (newInput.trim() !== '') {
            const message = {
                user: 'User', 
                message: newInput,
                timestamp: new Date().toLocaleTimeString(), // Optional: add timestamp
            };
            socket.emit('sendMessage', message);
            setNewInput(''); // ✅ Corrected: clear input field, not messages
        }
    };

    return (
        <div className="chatbox">
            <div className="chatbox-header">Chat Box</div>
            <div className="chatbox-messages">
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} className="message">
                            <strong>{message.user}: </strong>{message.message}
                        </div>
                    ))
                ) : (
                    <div className="no-messages">No messages yet</div>
                )}
            </div>
            <input 
                type="text" 
                value={newInput} 
                onChange={(e) => setNewInput(e.target.value)} 
                placeholder="Type a message..." 
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatBox;
