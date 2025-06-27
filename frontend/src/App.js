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

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);
const appearance = {
  theme: 'stripe',
  variables: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    borderRadius: '4px',
    spacingUnit: '4px'
  }
};



function App() {
  return (
    <>
      <Header />
      <Elements stripe={stripePromise}>
        <RouterProvider router={allRoutes} />

      </Elements>
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
         
        {/* <ChatBox /> */}
       
      
        <Footer/>
    </>

  );
}

export default App;