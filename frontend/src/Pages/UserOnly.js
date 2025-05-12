import React, { useEffect, useState } from 'react';
import { getUserById } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const UserOnly = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("@token"));
                console.log("token from useronly:", token);
                const user = JSON.parse(localStorage.getItem("@user"));
                console.log("user from useronly:", user);
                const id = user?.id;
                console.log("id from useronly:", id);

                if (!token || !user?.id) {
                    toast.error("User not logged in or missing token.");
                    return;
                }

                const res = await getUserById(id);
                console.log("result from useronly:", res);

                if (res?.user) {
                    setUserData(res.user);
                    console.log("Fetched user data:", res.user);
                } else {
                    toast.error("User not found.");
                }

            } catch (error) {
                toast.error("Failed to load user data.");
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    if (!userData) return <div className="text-center mt-10 text-gray-600">Loading user data...</div>;

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm" style={{ width: '28rem' }}>
                <div className="card-body text-center">
                    <img
                        src={userData.image || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="rounded-circle mb-1"
                        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                    />
                    <h5 className="card-title">{userData.firstName}  {userData.lastName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{userData.role || 'User'}</h6>
                    <ul className="list-group list-group-flush text-start mt-3">
                        <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
                        <li className="list-group-item"><strong>Phone:</strong> {userData.phone || 'N/A'}</li>
                        <li className="list-group-item"><strong>Gender:</strong> {userData.gender || 'N/A'}</li>
                        <li className="list-group-item"><strong>Age:</strong> {userData.age || 'N/A'} Years</li>
                        <li className="list-group-item">
                            <strong>Weight:</strong> {userData.weight || 'N/A'} kg
                            <span className="ms-4"><strong>Height:</strong> {userData.height || 'N/A'} cm</span>
                        </li>

                        <li className="list-group-item"><strong>Goal:</strong> {userData.goal || 'N/A'}</li>
                        <li className="list-group-item">
                            <strong>Membership:</strong> {userData.memberShip || 'N/A'}
                        <span className="ms-4"><strong>Payment Status:</strong> {userData.paymentStatus || 'N/A'}</span></li>
                        <li className="list-group-item"><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default UserOnly;
