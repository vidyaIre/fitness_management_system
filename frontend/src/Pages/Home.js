import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
        <p>Here you can find various features and functionalities.</p>
        <div>
            <Link to="/login">Login</Link><br></br>
            <Link to="/register">Register</Link>
        </div>
    </div>
  )
}

export default Home;