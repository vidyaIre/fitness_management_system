import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  console.log("id is:", id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        console.log("res is:", res);
        if (res?.user && res?.success) {
          setFormData( res.user);
          toast.success("User loaded successfully");
        } else {
          toast.error("User not found");
        }
      } catch (err) {
        toast.error("Failed to load user");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if(newPassword.trim() !== '') {
      updatedData.password = newPassword;
    } else{
      delete updatedData.password; 
    }
    try {
     await updateUser(id, updatedData);
      toast.success("User updated successfully");
      navigate('/Pages/DashboardAdmin');
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            "firstName", "lastName", "email", "phone", "age", "gender",
            "role", "specialization", "experience", "certification",
            "weight", "height", "goal", "memberShip", "paymentStatus",
          ].map((field) => (
            <div className="col-md-6" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="col-md-6">
            <label className="form-label">New Password (optional)</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
