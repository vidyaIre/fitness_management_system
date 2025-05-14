import React, { useEffect, useState } from 'react';
import { getUserById } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const AdminOnly = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;

        if (!token || !id) {
          toast.error("Admin not logged in or missing token.");
          return;
        }

        const res = await getUserById(id);
        if (res?.user && res.user.role === 'admin') {
          setAdminData(res.user);
        } else {
          toast.error("Access denied or admin not found.");
        }
      } catch (error) {
        toast.error("Failed to load admin data.");
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, []);

  if (!adminData) return <div className="text-center mt-5 text-muted">Loading admin data...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src={adminData.image || 'https://via.placeholder.com/120'}
            alt="Admin"
            className="rounded-circle border border-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h3 className="mt-3">{adminData.firstName} {adminData.lastName}</h3>
          <span className="badge bg-danger text-uppercase">{adminData.role}</span>
        </div>

        <hr />

        <div className="row text-start">
          <div className="col-6 mb-3"><strong>Email:</strong><br />{adminData.email}</div>
          <div className="col-6 mb-3"><strong>Phone:</strong><br />{adminData.phone || 'N/A'}</div>
          <div className="col-6 mb-3"><strong>Gender:</strong><br />{adminData.gender || 'N/A'}</div>
          <div className="col-6 mb-3"><strong>Age:</strong><br />{adminData.age || 'N/A'} Years</div>
          <div className="col-12 mb-3"><strong>Joined:</strong><br />{new Date(adminData.createdAt).toLocaleDateString()}</div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-primary me-2">Manage Users</button>
          <button className="btn btn-outline-secondary">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminOnly;
