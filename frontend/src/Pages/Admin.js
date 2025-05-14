import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserAll } from '../apiUtils/userApi';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getUserAll();
        setUsers(res?.users || []);
      } catch (error) {
        toast.error("Failed to load user data.");
        console.error("AdminOnly error:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const totalAdmins = users.filter(user => user.role === 'admin').length;
  const totalUsers = users.filter(user => user.role !== 'user').length;
  const totalTrainers = users.filter(user => user.role === 'trainer').length;
  const paidUsers = users.filter(user => user.paymentStatus === 'paid').length;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row g-4 mb-4">
      <div className="col-md-3">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h5 className="card-title">Total Admin</h5>
              <p className="card-text fs-4">{totalAdmins}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Trainers</h5>
              <p className="card-text fs-4">{totalTrainers}</p>
            </div>
          </div>
        </div>


        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Paid Users</h5>
              <p className="card-text fs-4">{paidUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Recent Registrations</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(-5).reverse().map((user, idx) => (
            <tr key={idx}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td><span className={`badge bg-${user.role === 'admin' ? 'danger' : user.role === 'trainer' ? 'success' : 'secondary'}`}>{user.role}</span></td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
