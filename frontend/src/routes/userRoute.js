import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Users from "../Pages/Users";

const isAuthenticated = () => {
    const token = localStorage.getItem('@token');
    const user = localStorage.getItem('@user');
    if (token && user) return true;
    return false;
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/Pages/Login" />;
}

// Fallback Route Component
const FallbackRoute = () => {
    return isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/Pages/Login" />;
}

const routes = createBrowserRouter([
    // root route
    {
        path:"/",
        element: <Home />,
    },
    // authentication routes
    {
        path: "/Pages/Login",
        element: <Login />,
    },
    // protected routes
    {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: "/Pages/Users",
        element: <ProtectedRoute element={<Users />} />,
    },

    // fallback routes
    {
        path: "*",
        element: <FallbackRoute />,
    }
]);

// ... existing code ...x`
export default routes;