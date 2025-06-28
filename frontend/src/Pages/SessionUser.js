import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllSessionsByUserId } from '../apiUtils/sessionApi';

const SessionUser = () => {
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("@token"));
                const user = JSON.parse(localStorage.getItem("@user"));
                const id = user?.id;
                if (!token || !id) {
                    console.error("User not logged in or missing token.");
                    return;
                }
                const result = await getAllSessionsByUserId(id);
                console.log("Fetched session from sessionUser:", result);
                if (result.success && result.sessions) {
                    setSessionData(result.sessions);
                } else {
                    console.error("Failed to fetch sessions.");
                }
            } catch (error) {
                console.error("Error fetching session users:", error);
            }
        };
        fetchSessions();
    }, []);
   return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-success">Session Details</h2>

      {sessionData.length > 0 ? (
        <div className="accordion accordion-flush" id="sessionAccordion">
          {sessionData.map((session, idx) => (
            <div key={session._id} className="accordion-item mb-3 shadow-sm rounded">
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button
                  className="accordion-button collapsed bg-success text-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded="false"
                  aria-controls={`collapse${idx}`}
                >
                 <b className='fw-bold fs-4'> {session.type_of_session} </b> 
                  </button>
                </h2>
              <div  
                id={`collapse${idx}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${idx}`}
                data-bs-parent="#sessionAccordion"
              >
                <div className="accordion-body bg-light text-dark">
                    <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {session.duration} mins</p>
                    <p><strong>Time:</strong> {session.time}</p>
                  <p><strong>Trainer:</strong> {session.trainer?.firstName || 'N/A'}</p>
                  <p><strong>Workout:</strong> {session.workout?.description || 'N/A'}</p>
                  {session.workout?.exercises?.length > 0 && (
                    <>
                      <h5 className="mt-3"> Exercises</h5>
                      <ul className="list-group list-group-flush">
                        <em>
                        {session.workout.exercises.map((ex, i) => (
                          <li key={i} className="list-group-item">
                            <strong>{ex.name}</strong> – {ex.sets} × {ex.reps}
                            {ex.weight && `, ${ex.weight}kg`}
                          </li>
                        ))}
                        </em>
                      </ul>
                    </>
                  )}
                  <div className="mt-3">
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${
                      session.status === 'completed' ? 'bg-success' :
                      session.status === 'cancelled' ? 'bg-danger' :
                      'bg-info'
                    } text-capitalize`}>
                      {session.status}
                    </span>
                  </div>
                  {session.feedback && (
                    <p className="mt-2"><strong>Feedback:</strong> {session.feedback}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No sessions found.</p>
      )}
    </div>
  );
};


export default SessionUser;