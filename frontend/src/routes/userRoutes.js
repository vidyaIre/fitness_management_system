import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const userRoutes = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]) 


export default userRoutes;