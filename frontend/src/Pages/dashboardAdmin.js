import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserAll,deleteUser } from '../apiUtils/userApi'; // Make sure deleteUserById exists
import {Link} from 'react-router-dom';
const DashboardAdmin = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUserAll();
        if (res?.success && res?.users) {
          setUserData(res.users);
          toast.success("All users fetched");
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (err) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id, firstName) => {
    console.log("id is:", id);
    console.log("firstName is:", firstName);
    if (window.confirm(`Are you sure you want to delete ${firstName}?`)) {
      try {
        await deleteUser(id); // Ensure this function is implemented in your backend
        setUserData(prev => prev.filter(u => u._id !== id));
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error("Error deleting user");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Admin Dashboard</h2>
      {userData.length === 0 ? (
        <p className="text-center">No users available.</p>
      ) : (
        userData.map(user => (
          <div key={user._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.image || 'https://via.placeholder.com/100?text=User'}
                  alt={user.firstName}
                  className="rounded-circle me-3 border border-2"
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-0">{user.firstName} {user.lastName}</h5>
                  <small className="text-muted">{user.email}</small>
                  <div>
                    <span className="badge bg-secondary text-capitalize mt-1">{user.role}</span>
                  </div>

                  {user.role === 'trainer' && (
                    <div className="mt-2">
                      <p className="mb-1"><strong>Specialization:</strong> {user.specialization}</p>
                      <p className="mb-1"><strong>Experience:</strong> {user.experience} years</p>
                      <p className="mb-1"><strong>Certification:</strong> {user.certification}</p>
                    </div>
                  )}
                  {user.role === 'user' && (
                    <div className="mt-2">
                      <p className="mb-1"><strong>Weight:</strong> {user.weight} kg</p>
                      <p className="mb-1"><strong>Height:</strong> {user.height} cm</p>
                      <p className="mb-1"><strong>Goal:</strong> {user.goal}</p>
                      <p className="mb-1"><strong>MemberShip:</strong> {user.memberShip}</p>
                      <p className="mb-1"><strong>Payment Status:</strong> {user.paymentStatus}</p>
                    </div>
                  )}
                  {user.role === 'admin' && (
                    <div className="mt-2">
                      <p className="mb-1"><strong>Admin Privileges:</strong> Full Access</p>
                      <p className='mb-1'><strong>Contact:</strong>{user.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Link to ={`/Pages/ViewUser/${user._id}`} className="btn btn-info btn-sm">View</Link>
                <Link to={`/Pages/EditUser/${user._id}`} className="btn btn-warning btn-sm">Edit</Link>
                { <button
                  onClick={() => handleDelete(user._id, user.firstName)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button> }
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardAdmin;
