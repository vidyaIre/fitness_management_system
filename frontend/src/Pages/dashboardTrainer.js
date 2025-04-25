import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserAll } from "../apiUtils/userApi";
import { getAllSessions } from "../apiUtils/sessionApi";

const DashboardTrainer = () => {
  const [dashTrainer, setDashTrainer] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [scheduleSession, setScheduleSession] =useState([]);
  const [complteSession, setCompleSession] = useState([]);
  const [cancelSession, setCancelSession] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const userData = await getUserAll();
        console.log("user data:", userData);
        const trainer = userData?.users.filter(trainer => trainer.role === "trainer") || [];
        console.log("trainer only:", trainer);

        setDashTrainer(trainer || []);



        if (userData?.success) {
          toast.success("Trainer fetched successfuly");
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
        console.log(dataValue);

        const scheduleSession = dataValue.sessions.filter(session => session.status === "scheduled");
        console.log("scheduled session is:", scheduleSession);
        const complteSession = dataValue.sessions.filter(session => session.status === "completed");
        console.log("completed session is:", complteSession);
        const  cancelSession = dataValue.sessions.filter(session  => session.status === "cancelled");
        console.log("cancelled session is:", cancelSession);

        setSessions(dataValue);
        setScheduleSession(scheduleSession);
        setCompleSession(complteSession);
        setCancelSession(cancelSession);

      } catch (error) {
        toast.error("Fialed to fetch session list:");
      }
    };

    fetchSession();
  }, []);

  const count = dashTrainer.length || 0;
  console.log("count:",count);


  return (
    <div className="mt-5">
      <h2 className="text-center mb-4 text-primary">Trainer Dashboard</h2>

      {/* Stats Summary */}
      <div className="mb-4 row">
        <div className="col-md-3">
          <div className="text-center border shadow-sm p-4">
            <div>Total Trainer</div>
            <div className="fs-4 fw-bold">{dashTrainer.length}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center border shadow-sm p-4">
            <div>Upcoming Sessions</div>
            <div className="fs-4 fw-bold">{scheduleSession.length+1}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center border shadow-sm p-4">
            <div>Completed Session</div>
            <div className="fs-4 fw-bold">{complteSession.length+1}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center border shadow-sm p-4">
            <div>Cancelled Sessions</div>
            <div className="fs-4 fw-bold">{cancelSession.length+1}</div>
          </div>
        </div>
      </div>


      {/* Upcoming Sessions and Clients */}
      <div className="row">
        <div className="col-md-8">
          <div className="shadow-sm mb-4">
            <div className="bg-primary text-white p-3">
              Upcoming Sessions
            </div>
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
                {
                  scheduleSession.map((session,i) => (
                    <tr key={i}>
                      <td>{session?.date.split("T")[0]}</td>
                      <td>{session.user?.firstName}{ '.'}{session.user?.lastName}</td>
                      <td>{session.workout?.title}</td>
                      <td>{session.time}</td>

                    </tr>
                  ))
                }
              
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
  <div className="mb-4">
    <div className="bg-secondary text-white p-3">
      Active Trainers
    </div>
    <div className="row row-cols-1 g-3 mt-2">
      {dashTrainer.map((trainer, idx) => (
        <div className="col" key={idx}>
          <div className="card h-100 shadow-sm">
            <div className="row g-0">
              <div className="col-4">
                <img
                  src={trainer.image || "https://via.placeholder.com/100"}
                  alt={`${trainer.firstName} ${trainer.lastName}`}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h6 className="card-title mb-1">
                    {trainer.firstName} {trainer.lastName}
                  </h6>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {trainer.email}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Role: {trainer.role}</small>
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

      {/* Call-to-Action */}
      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg" onClick={() => window.location.href = "/Pages/createWorkout"}>
          + Create Workout Plan
        </button>
      </div>
    </div>
  );
};

export default DashboardTrainer;
