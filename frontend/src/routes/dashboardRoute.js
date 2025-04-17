import React from 'react';


const dashboardRoute = () => {
    const user = localStorage.getItem("@user");
    console.log("user from dashboard route:", user);
    if (!user) {
        return <Navigate to="/Pages/Home" />;
    }
    switch (user.role) {
        case "admin":
            return <Navigate to="/Pages/dashboardAdmin" />;
        case "user":
            return <Navigate to="/Pages/dashboardUser" />;
        case "trainer":
            return <Navigate to="/Pages/dashboardTrainer" />;
        default:
            return <Navigate to="/Pages/Home" />;
    }
}

export default dashboardRoute;