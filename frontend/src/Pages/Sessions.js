import React, { useEffect, useState } from 'react'
import { getAllSessions } from '../apiUtils/sessionApi';
import { toast } from 'react-toastify';

const Sessions = () => {
  const [sessionName, setSessionName] = useState([]);
  async function fetchSession() {
    try {
      const sessionData = await getAllSessions();
      console.log("session data is:", sessionData);
      const token = localStorage.getItem("@token");
      console.log("token is:", token);
      setSessionName(sessionData?.sessions);
      console.log("List of session is:", sessionData?.sessions);

      if (sessionData?.success) {
        toast.success("Session fetched successfully");
      } else {
        toast.error("Error fetching Session");
      }

    } catch (error) {
      console.log("Error fetching Session is:", error);
      toast.error("Error fetching session");
    }
  }
  useEffect(() => {
    fetchSession();
  },
    //eslint-disable-next-line[]);
    []
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Session Details</h2>
      {sessionName.map((sessions) => (
        <div key={sessions._id} className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Session: {sessions.type_of_session}</h4>
          </div>
          <div className="card-body">
            <p><strong>User:</strong> {sessions.user?.firstName}</p>
            <p><strong>Trainer:</strong> {sessions.trainer?.firstName}</p>
            <p><strong>Workout Description:</strong> {sessions.workout?.description}</p>
  
            {sessions.workout?.exercises?.length > 0 && (
            <>
              <h5 className="mt-4">Exercises</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Exercise Name</th>
                      <th scope="col">Sets</th>
                      <th scope="col">Reps</th>
                      <th scope="col">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.workout.exercises.map((exercise, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
            <p><strong>Date:</strong> {new Date(sessions.createdAt).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {sessions.time}</p>
            <p><strong>Duration:</strong> {sessions.duration}</p>
            <p><strong>Feedback:</strong> {sessions.feedback || "No feedback"}</p>
            <p><strong>Status:</strong>
              <span className={`badge ms-2 ${
                sessions.status === 'completed' ? 'bg-success' :
                sessions.status === 'cancelled' ? 'bg-danger' :
                sessions.status === 'scheduled' ? 'bg-info' :
                'bg-warning text-dark'
              }`}>
                {sessions.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Sessions;