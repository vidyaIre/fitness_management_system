import React from 'react';
import Home from './Home';
import NotFound from './NotFound';

const dashboardRouter = () => {
    const user = JSON.parse(localStorage.getItem("@user"));
    console.log("user is:", user);

    if (!user) {
        return <Home />;
    }
    switch (user.role) {
        case "admin":
            return <dashboardAdmin />;
        case "user":
            return <dashboardUser />;
        case "trainer":
            return <dashboardTrainers />;
        default:
            return <NotFound />;
    }
}

export default dashboardRouter;