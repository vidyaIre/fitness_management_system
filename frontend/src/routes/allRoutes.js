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
import VerifyOtp from '../Pages/verifyOtp';
import DashboardUser from '../Pages/DashboardUser';
import DashboardAdmin from '../Pages/DashboardAdmin';
import ViewUser from '../Pages/ViewUser';
import EditUser from '../Pages/EditUser';
import MembershipPlans from '../Pages/MemberShipPlans';
import Payments from '../Pages/Payments';
import UserOnly from '../Pages/UserOnly';
import TrainerOnly from '../Pages/TrainerOnly';
import AdminOnly from '../Pages/AdminOnly';
import Admin from '../Pages/Admin';
import UserDash from '../Pages/UserDash';
import WorkoutUser from '../Pages/WorkoutUser';
import SessionUser from '../Pages/SessionUser';
import NutritionUser from '../Pages/NutritionUser';

const isAuth = () => {
    const token = localStorage.getItem('@token');
    const user = (localStorage.getItem('@user')) ? JSON.parse(localStorage.getItem('@user')) : null;
    if (token && user) return user;
    return null;
};

const ProtecterRoute = ({ element }) => {
    return isAuth() ? element : <Navigate to="/Pages/Home" />;
};
const ProtecterRoleRoute = ({ element, allowedRole }) => {
    const user = isAuth();

    if (!user) {
        return <Navigate to="/Pages/Home" />;
    }
    if (!allowedRole.includes(user.role)) {
        return <Navigate to="/Pages/NotFound" />;
    }
    return element;
};

const userRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Pages/Login",
        element: <Login />
    },
    {
        path: "/Pages/Register",
        element: <Register />
    },
    {
        path: "/Pages/MembershipPlans",
        element: <MembershipPlans />
    },
    {
        path: "/Pages/Payments",
        element: <Payments />
    },
    {
        path: "/Pages/Users",
        element: <ProtecterRoute element={<Users />} />
    },
    {
        path: "/Pages/UserOnly",
        element: <ProtecterRoute element={<UserOnly />} />
    },
    {
        path: "/Pages/TrainerOnly",
        element: <ProtecterRoute element={<TrainerOnly />} />
    },
    {
        path: "/Pages/AdminOnly",
        element: <ProtecterRoute element={<AdminOnly />} />
    },
    {
        path: "/Pages/Admin",
        element: <ProtecterRoute element={<Admin />} />
    },
    {
        path: "/Pages/Workouts",
        element: <ProtecterRoute element={<Workouts />} />
    },
    {
        path: "/Pages/Nutrition",
        element: <ProtecterRoute element={<Nutrition />} />
    },
    {
        path: "/Pages/Sessions",
        element: <ProtecterRoute element={<Sessions />} />
    },
    {
        path: "/Pages/CreateWorkout",
        element: <ProtecterRoute element={<CreateWorkout />} />
    },
    {
        path: "/Pages/CreateNutrition",
        element: <ProtecterRoute element={<CreateNutrition />} />
    },
    {
        path: "/Pages/CreateSession",
        element: <ProtecterRoute element={<CreateSession />} />
    },
    {
        path: "/Pages/DashboardTrainer",
        element: <ProtecterRoleRoute element={<DashboardTrainer />} allowedRole={['trainer']} />
    },
    {
        path: "/Pages/verifyOtp",
        element: <ProtecterRoute element={<VerifyOtp />} />
    },
    {
        path: "/Pages/DashboardUser",
        element: <ProtecterRoleRoute element={<DashboardUser />} allowedRole={['user']} />
    },

    {
        path: "/Pages/DashboardAdmin",
        element: <ProtecterRoleRoute element={<DashboardAdmin />} allowedRole={['admin']} />
    },

    {
        path: "/Pages/ViewUser/:id",
        element: <ProtecterRoute element={<ViewUser />} />
    },
    {
        path: "/Pages/EditUser/:id",
        element: <ProtecterRoute element={<EditUser />} />
    },
    {
        path: "/Pages/UserDash",
        element: <ProtecterRoleRoute element={<UserDash />} allowedRole={['user']} />
    },
    {
        path: "/Pages/WorkoutUser",
        element: <ProtecterRoute element={<WorkoutUser />} allowedRole={['user']} />
    },
    {
        path: "/Pages/SessionUser",
        element: <ProtecterRoute element={<SessionUser />} allowedRole={['user']} />
    },
    {
        path: "/Pages/NutritionUser",
        element: <ProtecterRoute element={<NutritionUser />} allowedRole={['user']} />
    },
    {
        path: "*",
        element: <NotFound />
    }
])


export default userRoutes;