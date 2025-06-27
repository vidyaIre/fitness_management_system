import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
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
        <div>
            <div className="d-flex justify-content-center mb-3 mt-2">
                <div className="container">
                    <div className="d-flex justify-content-center mb-3 mt-2">
                        <h1>Workout List</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>User:</th>
                                    <th>Workout Title</th>
                                    <th>Description</th>
                                    <th>Exercise</th>
                                    <th>sets</th>
                                    <th>reps</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  workoutUser && workoutUser?.length > 0 ? (

                                        workoutUser.map((workout) => (
                                            <tr key={workout._id}>
                                                <td>{workout?.UserId?.firstName || workout?.user?.firstName|| "N/A"}</td>
                                                <td>{workout.title}</td>
                                                <td>{workout.description}</td>
                                                <td>
                                                    {
                                                        workout.exercises && workout.exercises?.length > 0 ? (
                                                            workout.exercises.map((exercises, index) => (
                                                                <div key={index}>
                                                                    <div>{exercises.name}</div>
                                                                </div>
                                                            ))
                                                        ) : ("No exercises")
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        workout.exercises && workout.exercises?.length > 0 ?
                                                            workout.exercises.map((exercises, index) => (
                                                                <div key={index}>{exercises.sets}</div>
                                                            ))
                                                            : "N/A"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        workout.exercises && workout.exercises?.length > 0 ?
                                                            workout.exercises.map((exercises, index) => (
                                                                <div key={index}>{exercises.reps}</div>
                                                            ))
                                                            : "N/A"

                                                    }
                                                </td>

                                                <td>{new Date(workout.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No workouts found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default WorkoutUser;