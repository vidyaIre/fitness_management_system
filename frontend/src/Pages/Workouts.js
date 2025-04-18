import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getWorkoutAll } from '../apiUtils/workoutApi'

const Workouts = () => {
    const [workoutName, setWorkoutName] = useState([]);
    async function fetchWorkout() {
        try {
            const workoutData = await getWorkoutAll();
            console.log("workoutData is:", workoutData);
            const token = localStorage.getItem("@token");
            console.log("stored token is:", token);
            setWorkoutName(workoutData?.workouts);
            console.log("list of workouts is:", workoutData?.workouts);
            if (workoutData?.success) {
                toast.success("Workouts fetched successfully");
            } else {
                toast.error("Failed to fetch workouts");
            }
        } catch (error) {
            console.log("Error fetching workouts:", error);
            toast.error("Error fetching workouts");
        }
    }
    useEffect(() => {
        fetchWorkout();
    },
        //eslint-disable-next-line[]);
        []);

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
                                    <th>Workout Name</th>
                                    <th>Description</th>
                                    <th>Exersise</th>
                                    <th>sets</th>
                                    <th>reps</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    workoutName && workoutName?.length > 0 ? (
                                        workoutName.map((workout) => (
                                            <tr key={workout._id}>
                                                <td>{workout.name}</td>
                                                <td>{workout.description}</td>
                                                <td>{workout.exersise}</td>
                                                <td>{workout.sets}</td>
                                                <td>{workout.reps}</td>
                                                <td>{new Date(workout.date).toLocaleDateString()}</td>
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

export default Workouts;