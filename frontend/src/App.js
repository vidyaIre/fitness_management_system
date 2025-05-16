import React from "react";
import ChatBox from "./components/ChatBox";
//import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import allRoutes from "./routes/allRoutes";
import Header from './layouts/Header';
import Footer from "./layouts/Footer";



function App() {
  return (
    <>
   
    <Header/>
      <RouterProvider router={allRoutes} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom} />
         { <div className="App">
        <ChatBox />
        <h1>Fitness Management System</h1>
        <h2>Welcome to the Fitness Management System</h2>
        <p>Manage your workouts, nutrition, and sessions effectively.</p>
        </div>
      }
        <Footer/>
    </>

  );
}

export default App;