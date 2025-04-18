import React from 'react';
import Home from './Home';
import dashboardAdmin from './dashboardAdmin';
import dashboardUser from './dashboardUser';
import dashboardTrainer from './dashboardTrainer';
import NotFound from './NotFound';



const Dashboard = () => {
    //const user = JSON.parse(localStorage.getItem("@user"));
    //console.log("user from dashboard route:", user);
    if (!user) {
        return <Home />;
    }
    switch (user.role) {
        case "admin":
            return <dashboardAdmin />;
        case "user":
            return <dashboardUser />;
        case "trainer":
            return <dashboardTrainer />;
        default:
            return <NotFound />;
    }
}

export default Dashboard;