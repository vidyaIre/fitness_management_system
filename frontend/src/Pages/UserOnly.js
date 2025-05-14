import React, { useEffect, useState } from 'react';
import { getUserById } from '../apiUtils/userApi';
import { toast } from 'react-toastify';
import UserCard from '../components/UserCard';

const UserOnly = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;

        if (!token || !id) {
          toast.error("User not logged in or missing token.");
          return;
        }

        const res = await getUserById(id);

        if (res?.user && res.user.role === 'user') {
          setUserData(res.user);
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

  if (!userData) return <div className="text-center mt-5 text-muted">Loading user data...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-3 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src={userData.image || 'https://via.placeholder.com/120'}
            alt="Profile"
            className="rounded-circle border border-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h3 className="mt-3">{userData.firstName} {userData.lastName}</h3>
          <span className={`badge bg-${userData.role === 'admin' ? 'danger' : userData.role === 'trainer' ? 'warning' : 'success'} text-capitalize`}>
            {userData.role}
          </span>
        </div>

        <hr />

        <div className="row">
          <div className="col-6 mb-2"><strong>Email:</strong><br />{userData.email}</div>
          <div className="col-6 mb-2"><strong>Phone:</strong><br />{userData.phone || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Gender:</strong><br />{userData.gender || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Age:</strong><br />{userData.age || 'N/A'} Years</div>
          <div className="col-6 mb-2"><strong>Weight:</strong><br />{userData.weight || 'N/A'} kg</div>
          <div className="col-6 mb-2"><strong>Height:</strong><br />{userData.height || 'N/A'} cm</div>
          <div className="col-6 mb-2"><strong>Goal:</strong><br />{userData.goal || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Membership:</strong><br />{userData.memberShip || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Payment:</strong><br />
            <span className={`badge bg-${userData.paymentStatus === 'Paid' ? 'success' : 'secondary'}`}>
              {userData.paymentStatus || 'N/A'}
            </span>
          </div>
          <div className="col-6 mb-2"><strong>Joined:</strong><br />{new Date(userData.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserOnly;
