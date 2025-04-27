import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
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
        console.log(workoutValue);
        if (workoutValue && workoutValue.workouts) {
        setWorkouts(workoutValue || []);
        }
        else{
          setWorkouts([]);
        }
      } catch (error) {
        toast.error("Failed to fetch workout list:");
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
          {/* Add more fields like age, gender, etc if needed */}
          <div className="mt-3">
            <h5 className="text-center">Workouts Completed: {workouts.length}</h5>
            <ul className="list-group list-group-flush">
              {workouts.map((workout) => (
                <li key={workout._id} className="list-group-item">
                  {workout.name || workout.sessionType || "Workout"} - {workout.date ? new Date(workout.date).toLocaleDateString() : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DashboardUser;