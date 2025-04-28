import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserAll } from '../apiUtils/userApi';
import { getAllWorkouts } from '../apiUtils/workoutApi';
import '../index.css'; // Custom CSS file for additional styles

const DashboardUser = () => {
  const [userData, setUserData] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserAll();
        //console.log("first", res);
        const user = res?.users.filter(user => user.role === 'user') || [];
        setUserData(user || []);
        if (res?.success) {
          toast.success("Users fetched successfully");
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching users");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutValue = await getAllWorkouts();
        console.log("second:", workoutValue);
        if (workoutValue && workoutValue.workouts) {
          setWorkouts(workoutValue.workouts);
        } else {
          setWorkouts([]);
        }
      } catch (error) {
        toast.error("Failed to fetch workout list");
        setWorkouts([]);
      }
    };
    fetchWorkout();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">User Dashboard</h1>
      {userData.map((user) => (
        <div key={user._id} className="card shadow-lg mb-4 rounded-lg">
          <div className="card-body">
            <div className="text-center">
              <img
                src={user.image || "default-profile-pic.jpg"}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3 className="fw-bold">{user.firstName} {user.lastName}</h3>
              <p className="text-muted">{user.email}</p>
              <p className="badge bg-secondary">{user.role}</p>
            </div>

            <div className="mt-4">
              <h5 className="text-center mb-4">
                Workouts: {
                  workouts.filter(workout => String(workout?.user?._id) === String(user?._id)).length
                }
              </h5>

              {workouts.filter(workout => String(workout.user?._id) === String(user._id)).length === 0 ? (
                <p className="text-center text-muted">No workouts completed yet.</p>
              ) : (
                <div className="timeline">
                  {workouts
                    .filter(workout => String(workout.user?._id) === String(user._id))
                    .map((workout) => (
                      <div key={workout._id} className="timeline-item mb-4">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content p-4 bg-light rounded">
                          <h5>{workout.title}</h5>
                          <p><strong>Description:</strong> {workout.description}</p>
                          <h6>Exercises:</h6>
                          <ul className="list-unstyled">
                            {workout.exercises.map((exercise, index) => (
                              <li key={index}>
                                <strong>{exercise.name}</strong>: {exercise.sets} sets x {exercise.reps} reps
                                {exercise.weight && ` (Weight: ${exercise.weight} kg)`}
                              </li>
                            ))}
                          </ul>
                          <p className="text-muted">Date: {new Date(workout.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardUser;
