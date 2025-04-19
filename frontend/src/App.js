import React from "react";
//import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import allRoutes from "./routes/allRoutes";


function App() {
  return (
    <>
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
    </>

  );
}

export default App;