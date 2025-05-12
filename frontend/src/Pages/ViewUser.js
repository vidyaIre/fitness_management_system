import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        if (res?.user) {
          setUser(res.user);
        } else {
          toast.error("User not found");
        }
      } catch (err) {
        toast.error("Failed to load user");
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <div className="row g-4 align-items-center">
          {/* Image section */}
          <div className="col-md-4 text-center">
            <img
              src={user.image || 'https://via.placeholder.com/150?text=User'}
              alt="User"
              className="img-fluid rounded-circle border border-3 shadow"
              style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            />
            <h4 className="mt-3">{user?.firstName} {user?.lastName}</h4>
            <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'trainer' ? 'bg-success' : 'bg-primary'} text-capitalize`}>
              {user.role}
            </span>
          </div>

          {/* Details section */}
          <div className="col-md-8">
            <h5 className="mb-3">General Information</h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item"><strong>Email:</strong> {user?.email}</li>
              <li className="list-group-item"><strong>Gender:</strong> {user?.gender}</li>
              <li className="list-group-item"><strong>Age:</strong> {user?.age}</li>
            </ul>

            {/* Role-specific fields */}
            {user?.role === 'trainer' && (
              <>
                <h5 className="mb-3">Trainer Profile</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Specialization:</strong> {user?.specialization}</li>
                  <li className="list-group-item"><strong>Experience:</strong> {user?.experience} years</li>
                  <li className="list-group-item"><strong>Certification:</strong> {user?.certification}</li>
                </ul>
              </>
            )}

            {user?.role === 'user' && (
              <>
                <h5 className="mb-3">User Fitness Info</h5>
                <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Contact:</strong> {user?.phone || 'N/A'}</li>
                  <li className="list-group-item"><strong>Height:</strong> {user?.height} cm</li>
                  <li className="list-group-item"><strong>Weight:</strong> {user?.weight} kg</li>
                  <li className="list-group-item"><strong>Goal:</strong> {user?.goal}</li>
                  <li className="list-group-item"><strong>Membership:</strong> {user?.memberShip || 'N/A'}</li>
                  <li className="list-group-item"><strong>Payment Status:</strong> {user?.paymentStatus}</li>
                </ul>
              </>
            )}

            {user?.role === 'admin' && (
              <>
                <h5 className="mb-3">Admin Info</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Admin ID:</strong> {user?._id}</li>
                  <li className="list-group-item"><strong>Contact:</strong> {user?.phone || 'N/A'}</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
