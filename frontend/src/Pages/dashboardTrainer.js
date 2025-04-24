import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserAll } from "../apiUtils/userApi";

const DashboardTrainer = () => {
  const [dashTrainer, setDashTrainer] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const userData = await getUserAll();
        console.log("user data:", userData);
        const trainer = userData?.users.filter(trainer => trainer.role==="trainer") ||[];
        console.log("trainer only:", trainer);
        
        setDashTrainer(trainer|| []);
       
        

        if (userData?.success) {
          toast.success("Trainer fetched successfuly");
        } else {
          toast.error("Failed to fetch trainers");
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchTrainer();
  }, []);
  const count = dashTrainer.length || 0;
  console.log(count);
  return (
    <div className="mt-5">
      <h2 className="text-center mb-4 text-primary">Trainer Dashboard</h2>

      {/* Stats Summary */}
      <div className="mb-4 row">
        <div className="col-md-4">
          <div className="text-center border shadow-sm p-4">
            <div>Total Trainer</div>
            <div className="fs-4 fw-bold">{dashTrainer.length}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center border shadow-sm p-4">
            <div>Upcoming Sessions</div>
            <div className="fs-4 fw-bold">6</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-center border shadow-sm p-4">
            <div>Completed Workouts</div>
            <div className="fs-4 fw-bold">120</div>
          </div>
        </div>
      </div>
      

      {/* Upcoming Sessions and Clients */}
      <div className="row">
        <div className="col-md-8">
          <div className="shadow-sm mb-4">
            <div className="bg-primary text-white p-3">
              Upcoming Sessions
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Workout</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>April 25</td>
                  <td>John Doe</td>
                  <td>Chest Day</td>
                  <td>10:00 AM</td>
                </tr>
                <tr>
                  <td>April 26</td>
                  <td>Jane Smith</td>
                  <td>Leg Day</td>
                  <td>12:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <div className="shadow-sm mb-4">
            <div className="bg-secondary text-white p-3">
              Active Trainers
            </div>
            <ul className="list-group">
              {dashTrainer.map((trainers, idx) => (
                <li key={idx} className="list-group-item">
                  {trainers.firstName} {trainers.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg" onClick={() => window.location.href = "/Pages/createWorkout"}>
          + Create Workout Plan
        </button>
      </div>
    </div>
  );
};

export default DashboardTrainer;
