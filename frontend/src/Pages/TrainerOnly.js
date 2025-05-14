import React, { useEffect, useState } from 'react';
import { getUserById } from '../apiUtils/userApi';
import { toast } from 'react-toastify';

const TrainerOnly = () => {
  const [trainerData, setTrainerData] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;

        if (!token || !id) {
          toast.error("Trainer not logged in or missing token.");
          return;
        }

        const res = await getUserById(id);
        if (res?.user && res.user.role === 'trainer') {
          setTrainerData(res.user);
        } else {
          toast.error("Access denied or trainer not found.");
        }
      } catch (error) {
        toast.error("Failed to load trainer data.");
        console.error("Error fetching trainer data:", error);
      }
    };

    fetchTrainer();
  }, []);

  if (!trainerData) return <div className="text-center mt-5 text-muted">Loading trainer data...</div>;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-3 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src={trainerData.image || 'https://via.placeholder.com/120'}
            alt="Trainer"
            className="rounded-circle border border-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h3 className="mt-3">{trainerData.firstName} {trainerData.lastName}</h3>
          <span className="badge bg-warning text-dark text-capitalize">{trainerData.role}</span>
        </div>

        <hr />

        <div className="row">
          <div className="col-6 mb-2"><strong>Email:</strong><br />{trainerData.email}</div>
          <div className="col-6 mb-2"><strong>Phone:</strong><br />{trainerData.phone || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Gender:</strong><br />{trainerData.gender || 'N/A'}</div>
          <div className="col-6 mb-2"><strong>Age:</strong><br />{trainerData.age || 'N/A'} Years</div>
          <div className="col-6 mb-2"><strong>Experience:</strong><br />{trainerData.experience || 'N/A'} years</div>
          <div className="col-6 mb-2"><strong>Specialization:</strong><br />{trainerData.specialization || 'N/A'}</div>
          <div className="col-12 mb-2"><strong>Joined:</strong><br />{new Date(trainerData.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainerOnly;
