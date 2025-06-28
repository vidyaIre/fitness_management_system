import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllWorkoutsByUserId } from '../apiUtils/workoutApi';

const WorkoutUser = () => {
    const [workoutUser, setWorkoutUser] = useState([]);
    useEffect(() => {
        const fetchWorkoutUser = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("@token"));
                const user = JSON.parse(localStorage.getItem("@user"));
                const id = user?.id;
                if (!token || !id) {
                    console.error("User not logged in or missing token.");
                    return;
                }
                const result = await getAllWorkoutsByUserId(id);
                console.log("Fetched workout from workoutUser:", result);
                if (result.success && result.workouts) {
                    setWorkoutUser(result.workouts);
                } else {
                    console.error("Failed to fetch workouts.");
                }
            } catch (error) {
                console.error("Error fetching workout users:", error);
            }
        };
        fetchWorkoutUser();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4 text-primary">🏋️‍♂️ Workout List</h1>

            {workoutUser?.length > 0 ? (
                <div className="accordion" id="workoutAccordion">
                    {workoutUser.map((w, idx) => (
                        <div className="card mb-3 shadow" key={w._id} style={{ borderColor: '#0d6efd' }}>
                            <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white"
>
                                <div>
                                    <strong>{w.title}</strong> by {<strong>{w.user.firstName} {w.user.lastName}</strong> } 
                                </div>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${idx}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${idx}`}
                                >
                                    Details
                                </button>
                            </div>

                            <div id={`collapse${idx}`} className="collapse" data-bs-parent="#workoutAccordion">
                                <div
                                    className="card-body bg-light"
                                    style={{ borderTop: '3px solid #0d6efd' }}
                                >
                                    <p className="text-dark"><em>{w.description}</em></p>

                                    <table className="table table-sm table-hover">
                                        <thead className="table-primary">
                                            <tr>
                                                <th>Exercise</th>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                                <th>Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {w.exercises?.map((ex, i) => (
                                                <tr key={i}>
                                                    <td className="text-secondary">{ex.name}</td>
                                                    <td className="fw-bold text-info">{ex.sets}</td>
                                                    <td className="fw-bold text-info">{ex.reps}</td>
                                                    <td className="fw-bold text-info">{ex.weight} kg</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <p className="text-end text-info mb-0">
                                        Created: {new Date(w.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning text-center">No workouts found.</div>
            )}
        </div>
    );
}

export default WorkoutUser;