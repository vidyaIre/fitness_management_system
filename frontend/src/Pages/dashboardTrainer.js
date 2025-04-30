import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserAll } from "../apiUtils/userApi";
import { getAllSessions } from "../apiUtils/sessionApi";
import { FaUsers, FaCalendarAlt, FaCheckCircle, FaBan } from "react-icons/fa"; // Icons for stats

const DashboardTrainer = () => {
  const [dashTrainer, setDashTrainer] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [scheduleSession, setScheduleSession] = useState([]);
  const [complteSession, setCompleSession] = useState([]);
  const [cancelSession, setCancelSession] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const userData = await getUserAll();
        const trainer = userData?.users.filter(trainer => trainer.role === "trainer") || [];
        setDashTrainer(trainer || []);
        if (userData?.success) {
          toast.success("Trainer fetched successfully");
        } else {
          toast.error("Failed to fetch trainers");
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    fetchTrainer();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const dataValue = await getAllSessions();
        const scheduleSession = dataValue.sessions.filter(session => session.status === "scheduled");
        const complteSession = dataValue.sessions.filter(session => session.status === "completed");
        const cancelSession = dataValue.sessions.filter(session => session.status === "cancelled");

        setSessions(dataValue);
        setScheduleSession(scheduleSession);
        setCompleSession(complteSession);
        setCancelSession(cancelSession);
      } catch (error) {
        toast.error("Failed to fetch session list");
      }
    };
    fetchSession();
  }, []);

  const count = dashTrainer.length || 0;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Trainer Dashboard</h2>

      {/* Stats Summary */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg p-4 text-center rounded-3">
            <FaUsers className="fs-2 mb-2 text-primary" />
            <div>Total Trainers</div>
            <div className="fs-4 fw-bold">{dashTrainer.length}</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg p-4 text-center rounded-3">
            <FaCalendarAlt className="fs-2 mb-2 text-warning" />
            <div>Upcoming Sessions</div>
            <div className="fs-4 fw-bold">{scheduleSession.length}</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg p-4 text-center rounded-3">
            <FaCheckCircle className="fs-2 mb-2 text-success" />
            <div>Completed Sessions</div>
            <div className="fs-4 fw-bold">{complteSession.length}</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg p-4 text-center rounded-3">
            <FaBan className="fs-2 mb-2 text-danger" />
            <div>Cancelled Sessions</div>
            <div className="fs-4 fw-bold">{cancelSession.length}</div>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions and Active Trainers */}
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Upcoming Sessions</h5>
            </div>
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Workout</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleSession.map((session, i) => (
                    <tr key={i}>
                      <td>{session?.date.split("T")[0]}</td>
                      <td>{session.user?.firstName} {session.user?.lastName}</td>
                      <td>{session.workout?.title}</td>
                      <td>{session.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg rounded-3 mb-4 border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h5 className="mb-0">Active Trainers</h5>
            </div>
            <div className="list-group list-group-flush">
              {dashTrainer.map((trainer, idx) => (
                <div
                  className="list-group-item d-flex align-items-center p-4 shadow-sm mb-3 rounded-3 hover-card"
                  key={idx}
                >
                  <div className="position-relative me-4">
                    <img
                      src={trainer.image || "https://via.placeholder.com/150?text=Trainer+Image"}
                      alt={`${trainer.firstName} ${trainer.lastName}`}
                      className="img-fluid rounded-circle border border-4 border-light shadow-sm"
                      style={{
                        width: "80px", // Adjusted size for better visibility
                        height: "100px", // Adjusted size for better visibility
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <div className="card shadow-sm border-0 rounded-3">
                      <div className="card-body">
                        <h6 className="mb-2 text-primary font-weight-bold">{trainer.firstName} {trainer.lastName}</h6>
                        <p className="mb-1 text-muted">{trainer.email}</p>
                        <p className="mb-2 text-muted small">{trainer.role}</p>

                        <div className="mt-3">
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <strong>Specialization:</strong> {trainer.specialization}
                            </small>
                          </p>
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <strong>Experience:</strong> {trainer.experience} years
                            </small>
                          </p>
                          <p className="card-text mb-2">
                            <small className="text-muted">
                              <strong>Certification:</strong> {trainer.certification}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Workout and Nutrition Buttons */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success btn-lg me-3"
          onClick={() => window.location.href = "/Pages/createWorkout"}
        >
          + Create Workout Plan
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => window.location.href = "/Pages/createNutrition"}
        >
          + Create Nutrition Plan
        </button>
      </div>
    </div>
  );
};

export default DashboardTrainer;
