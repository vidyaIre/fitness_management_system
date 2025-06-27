import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserById } from "../apiUtils/userApi";
import { getAllWorkoutsByUserId } from "../apiUtils/workoutApi";
import { getNutritionByUserId } from "../apiUtils/nutritionApi";
import { getAllSessionsByUserId } from "../apiUtils/sessionApi";

const UserDash = () => {
  const [userData, setUserData] = useState(null);
  const [workoutData, setWorkoutData] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;

        if (!token || !id) {
          toast.error("User not logged in or missing token.");
          return;
        }

        const res = await getUserById(id);

        if (res?.user && res.user.role === 'user') {
          setUserData(res.user);
        } else {
          toast.error("User not found.");
        }
      } catch (error) {
        toast.error("Failed to load user data.");
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;
        console.log("inside fetchWorkouts, user id is:", id);
        if (!token || !id) {
          toast.error("User not logged in or missing token.");
          return;
        }
        const response = await getAllWorkoutsByUserId(id);
        console.log("Fetched workouts:", response);
        if (response.success && response.workouts) {
          setWorkoutData(response.workouts);
        } else {
          toast.error("Failed to fetch workouts.");
        }
      } catch (error) {
        toast.error("Error fetching workouts.");
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;
        if (!token || !id) {
          toast.error("User not logged in or missing token.");
          return;
        }
        const result = await getNutritionByUserId(id);
        console.log("Fetched nutrition data:", result);
        if (result.success && result.nutrition) {
          setNutritionData(result.nutrition);
        } else {
          toast.error("Failed to fetch nutrition data.");
        }

      } catch (error) {
        toast.error("Error fetching nutrition data.");
        console.error("Error fetching nutrition data:", error);
      }
    };
    fetchNutrition();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("@token"));
        const user = JSON.parse(localStorage.getItem("@user"));
        const id = user?.id;
        if (!token || !id) {
          toast.error("User not logged in or missing token.");
          return;
        }
        const response = await getAllSessionsByUserId(id);
        console.log("Fetched sessions:", response);
        if (response.success && response.sessions) {
          setSessionData(response.sessions);
        } else {
          toast.error("Failed to fetch sessions.");
        }
      } catch (error) {
        toast.error("Error fetching sessions.");
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, []);



  if (!userData) return <p className="text-center mt-5">Loading...</p>;

  //const tier = userData.memberShip?.toLowerCase() || 'basic';
  //const amount = membershipAmounts[tier] || membershipAmounts.basic;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Dashboard</h2>
      <div className="row gy-4">

        {/* Personal Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-primary h-100 shadow-sm">
            <div className="card-header bg-primary text-white">Personal Details</div>
            <div className="card-body text-center">
              <img src={userData.image} alt="User" className="img-fluid rounded-circle mb-3" style={{ width: '100px' }} />
              <ul className="list-unstyled text-start">
                <li><strong>Name:</strong> {userData.firstName} {userData.lastName}</li>
                <li><strong>Email:</strong> {userData.email}</li>
                <li><strong>Phone:</strong> {userData.phone}</li>
                <li><strong>Age:</strong> {userData.age} yrs</li>
                <li><strong>Height:</strong> {userData.height} cm</li>
                <li><strong>Weight:</strong> {userData.weight} kg</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workout Table */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white">Workout Plans</div>
            <div className="card-body p-0">
              {workoutData.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Exercises</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workoutData.map(w => (
                        <tr key={w._id}>
                          <td>{w.title}</td>
                          <td>{w.description}</td>
                          <td>
                            <ul className="mb-0 ps-3">
                              {w.exercises.map((e, i) => (
                                <li key={i}>{e.name}: {e.sets}×{e.reps} {e.weight ? `@${e.weight}kg` : ''}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center my-3 text-muted">No workouts available.</p>
              )}
            </div>
          </div>
        </div>



        {/* Nutrition Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-info h-100 shadow-sm">
            <div className="card-header bg-info text-white">Nutrition Plans</div>
            <div className="card-body">
              {nutritionData.length ? nutritionData.map(n => (
                <div key={n._id} className="mb-3">
                  <p><strong>Total Cal:</strong> {n.total_calories}</p>
                  {n.meals.map((m, i) => (
                    <div key={i}>
                      <h6 className="text-info">{m.meal_time}</h6>
                      <ul className="list-group">
                        {m.food_items.map((f, j) => (
                          <li key={j} className="list-group-item">
                            {f.food_name} — {f.quantity}, {f.calories} cal
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )) : <p className="text-muted">No nutrition data</p>}
            </div>
          </div>
        </div>

        {/* Sessions Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-warning h-100 shadow-sm">
            <div className="card-header bg-warning text-dark">Sessions</div>
            <div className="card-body">
              {sessionData.length ? sessionData.map(s => (
                <div key={s._id} className="mb-3">
                  <p><strong>{new Date(s.date).toLocaleDateString()}</strong> @ {s.time}</p>
                  <span className={`badge ${s.status === 'completed' ? 'bg-success' : s.status === 'cancelled' ? 'bg-danger' : 'bg-info'}`}>
                    {s.status}
                  </span>
                </div>
              )) : <p className="text-muted">No sessions yet</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Membership & Payment */}
      <div className="card text-bg-secondary text-white mt-4 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h5 className="card-title">Membership & Payment</h5>
          <p><strong>Membership:</strong> {userData.memberShip}</p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span className={`badge ${userData.paymentStatus === 'paid' ? 'bg-success' : 'bg-danger'}`}>
              {userData.paymentStatus}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserDash;
