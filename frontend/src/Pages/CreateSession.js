import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateSession = () => {
    const [formData, setFormData] = useState({
        user: "",
        trainer: "",
        workout: "",
        date: "",
        time: "",
        duration: "",
        type_of_session: "",
        feedback: "",
        status: ""
    });

    const [users, setUsers] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    const handleSession = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { user, trainer, workout, type_of_session } = formData;
        if (!user || !trainer || !workout || !type_of_session) {
            toast.error('Please fill all required fields');
            return;
        }
        try {
            const { data } = await axiosInstance.post("/session/createSession", formData);
            if (data?.success) {
                toast.success("Session created successfully");
                navigate("/Pages/Sessions");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const fetchDetails = async () => {
        try {
            const userData = await axiosInstance.get("/user/getUserAll");
            const workoutdata = await axiosInstance.get("/workout/getAllWorkouts");

            setUsers(userData?.data?.users || []);
            setWorkouts(workoutdata?.data?.workouts || []);
        } catch (error) {
            toast.error("Failed to fetch user/workout data");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const members = users.filter(details => details.role === "user");
    const trainers = users.filter(person => person.role === "trainer");

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Create Session</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">User</label>
                            <select
                                name='user'
                                value={formData.user}
                                onChange={handleSession}
                                className="form-select"
                            >
                                <option value="">Select User</option>
                                {members.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Trainer</label>
                            <select
                                name='trainer'
                                value={formData.trainer}
                                onChange={handleSession}
                                className="form-select"
                            >
                                <option value="">Select Trainer</option>
                                {trainers.map((trainer) => (
                                    <option key={trainer._id} value={trainer._id}>
                                        {trainer.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Workout</label>
                            <select
                                name='workout'
                                value={formData.workout}
                                onChange={handleSession}
                                className="form-select"
                            >
                                <option value="">Select Workout</option>
                                {workouts.map((workout) => (
                                    <option key={workout._id} value={workout._id}>
                                        {workout?.user?.firstName || "Unnamed Workout"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Date</label>
                            <input
                                type='date'
                                name='date'
                                value={formData.date}
                                onChange={handleSession}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Time</label>
                            <input
                                type='time'
                                name='time'
                                value={formData.time}
                                onChange={handleSession}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Duration (mins)</label>
                            <input
                                type='text'
                                name='duration'
                                value={formData.duration}
                                onChange={handleSession}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Type of Session</label>
                            <select
                                name='type_of_session'
                                value={formData.type_of_session}
                                onChange={handleSession}
                                className="form-select"
                            >
                                <option value="">Select Type</option>
                                <option value="personal">Personal Training</option>
                                <option value="group">Group Training</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Status</label>
                            <select
                                name='status'
                                value={formData.status}
                                onChange={handleSession}
                                className="form-select"
                            >
                                <option value="">Select Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Feedback</label>
                            <input
                                type='text'
                                name='feedback'
                                value={formData.feedback}
                                onChange={handleSession}
                                className="form-control"
                            />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success w-100">
                                Save Session
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSession;
