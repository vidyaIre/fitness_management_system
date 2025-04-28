import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserAll } from '../apiUtils/userApi';
import { getAllWorkouts } from '../apiUtils/workoutApi';

const DashboardUser = () => {
  const [userData, setUserData] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token is:", token);
        const res = await getUserAll();
        console.log("result is:", res);
        const user = res?.users.filter(user => user.role === 'user') || [];
        console.log("useronly:", user);
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
        console.log("get workouts:", workoutValue);
        if (workoutValue && workoutValue.workouts) {
          setWorkouts(workoutValue.workouts);
          console.log("workouts fetched:", workoutValue.workouts);
        }
        else {
          setWorkouts([]);
        }
      } catch (error) {
        toast.error("Failed to fetch workout list:");
        setWorkouts([]);
      }
    };
    fetchWorkout();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">User Dashboard</h1>
      {userData.map((user) => (
        <div key={user._id} className="card p-4 shadow mb-4">
          <img
            src={user.image || "default-profile-pic.jpg"}
            alt="Profile"
            className="rounded-circle mx-auto d-block mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="text-center">{user.firstName} {user.lastName}</h2>
          <p className="text-center">{user.email}</p>
          <p className="text-center">{user.role}</p>

          <div className="mt-3">
            <h5 className="text-center">
              Workouts Completed: {
                workouts.filter(workout => String(workout?.user?._id) === String(user?._id)).length
              }
            </h5>

            {workouts.filter(workout => String(workout.user?._id) === String(user._id)).length === 0 ? (
              <p className="text-center text-muted">No workouts completed yet.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Exercises</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts
                    .filter(workout => String(workout.user?._id) === String(user._id))
                    .map((workout) => (
                      <tr key={workout._id}>
                        <td>{workout.title}</td>
                        <td>{workout.description}</td>
                        <td>
                          <ul>
                            {workout.exercises.map((exercise, index) => (
                              <li key={index}>
                                {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                                {exercise.weight ? ` (Weight: ${exercise.weight} kg)` : ''}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>{new Date(workout.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardUser;
