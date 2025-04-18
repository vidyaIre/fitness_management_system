import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Workouts from "../Pages/Workouts";


const workoutRoute = createBrowserRouter ([
    {
        path: "/Pages/Workouts",
        element: <Workouts />,
    }
]) 
  
export default workoutRoute;