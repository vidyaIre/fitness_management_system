import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllWorkouts } from '../apiUtils/workoutApi'

const Workouts = () => {
    const [workoutName, setWorkoutName] = useState([]);
    async function fetchWorkout() {
        try {
            const workoutData = await getAllWorkouts();
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
                                  workoutName && workoutName?.length > 0 ? (

                                        workoutName.map((workout) => (
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

export default Workouts;