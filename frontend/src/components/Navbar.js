import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("@user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/Pages/Home");
    };
    return (
        <nav className="bg-green-600 text-white p-4 flex justify-between">
            <h1 className="font-bold text-xl">FitTrack</h1>
            <div className="space-x-4">
                {user?.role === 'trainer' && <Link to="/dashboardTrainer">Trainer Panel</Link>}
                {user?.role === 'user' && <Link to="/dashboardUser">Member Dashboard</Link>}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar;