import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  console.log("id is:", id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // firstName: '',
    // lastName: '',
    // email: '',
    // role: '',
    // age: '',
    // specialization: '',
    // experience: '',
    // certification: '',
    // weight: '',
    // height: '',
    // goal: '',
    // memberShip: '',
    // phone: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        console.log("res is:", res);
        if (res?.user && res?.success) {
          setFormData(
            //{
            // firstName: res.user.firstName || '',
            // lastName: res.user.lastName || '',
            // email: res.user.email || '',
            // role: res.user.role || '',
            // age: res.user.age || '',
            // specialization: res.user.specialization || '',
            // experience: res.user.experience || '',
            // certification: res.user.certification || '',
            // weight: res.user.weight || '',
            // height: res.user.height || '',
            // goal: res.user.goal || '',
            // memberShip: res.user.memberShip || '',
            // phone: res.user.phone || '',
           
          //}
          res.user)
          ;
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
    try {
      await updateUser(id, formData);
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
            "weight", "height", "goal", "memberShip"
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
