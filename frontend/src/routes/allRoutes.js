import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { Navigate } from 'react-router-dom';
import CreateWorkout from '../Pages/createWorkout';
import CreateNutrition from '../Pages/CreateNutrition';
import CreateSession from '../Pages/CreateSession';
import Users from '../Pages/Users';
import NotFound from '../Pages/NotFound';
import Workouts from '../Pages/Workouts';
import Nutrition from '../Pages/Nutrition';
import Sessions from '../Pages/Sessions';
import DashboardTrainer from '../Pages/DashboardTrainer';

const isAuth = () => {
const token = localStorage.getItem('@token');
const user = localStorage.getItem('@user');
if(token && user) return true;
return false;
};

 const ProtecterRoute = ({element}) => {
 return isAuth() ? element : <Navigate to = "../Pages/Home"/>;
 };

const userRoutes = createBrowserRouter([
     {
         path:"/",
         element:<Home/>
     },
    {
        path:"/Pages/Login",
        element:<Login/>
    },
    {
        path:"/Pages/Register",
        element:<Register/>
    },
    {
        path:"/Pages/Users",
        element:<ProtecterRoute element={<Users/>}/>
    },
    {
        path:"/Pages/Workouts",
        element:<ProtecterRoute element={<Workouts/>}/>
    },
    {
        path:"/Pages/Nutrition",
        element:<ProtecterRoute element={<Nutrition/>}/>
    },
     {
        path:"/Pages/Sessions",
        element:<ProtecterRoute element={<Sessions/>}/>
    },
    {
        path:"/Pages/CreateWorkout",
        element:<ProtecterRoute element={<CreateWorkout/>}/>
    }, 
    {
        path:"/Pages/CreateNutrition",
        element:<ProtecterRoute element={<CreateNutrition/>}/>
    },
    {
        path:"/Pages/CreateSession",
        element:<ProtecterRoute element={<CreateSession/>}/>
    },
    {
        path:"/Pages/DashboardTrainer",
        element:<ProtecterRoute element={<DashboardTrainer/>}/>
    },
    {
         path: "*",
         element:<NotFound/>
     }
]) 


export default userRoutes;