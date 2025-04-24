import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosConfig";
import { getUserAll } from "../apiUtils/userApi";

function CreateWorkout() {
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    description: "",
    exercises: [
      {
        name: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ],
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserAll();
        if (data?.success && data?.users) {
          const allUser = data.users;
          setUsers(allUser.filter(user => user.role === 'user'));
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUser();
  }, []);

  const handleWorkout = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkoutExercise = (index, e) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][e.target.name] = e.target.value;
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: "", sets: "", reps: "", weight: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("workout/createWorkout", formData);
      if (data?.success) {
        toast.success("Workout created successfully");
        navigate("/Pages/Workouts");
      } else {
        toast.error("Failed to create workout");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary">💪 Create Your Workout Plan</h2>
          <form onSubmit={handleSubmit}>
            {/* User Selection */}
            <div className="mb-3">
              <label className="form-label">User</label>
              <select
                className="form-select"
                name="user"
                value={formData.user}
                onChange={handleWorkout}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.firstName}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Workout Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., Chest Day"
                value={formData.title}
                onChange={handleWorkout}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Workout Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="Describe your workout plan..."
                value={formData.description}
                onChange={handleWorkout}
                required
              ></textarea>
            </div>

            {/* Exercises */}
            <div className="mb-3">
              <h5 className="mb-3 text-secondary">🏋️ Exercises</h5>
              {formData.exercises.map((exercise, index) => (
                <div key={index} className="border rounded p-3 mb-3 bg-light">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Exercise Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="e.g., Bench Press"
                        value={exercise.name}
                        onChange={(e) => handleWorkoutExercise(index, e)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Sets</label>
                      <input
                        type="number"
                        name="sets"
                        className="form-control"
                        placeholder="e.g., 3"
                        value={exercise.sets}
                        onChange={(e) => handleWorkoutExercise(index, e)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Reps</label>
                      <input
                        type="number"
                        name="reps"
                        className="form-control"
                        placeholder="e.g., 12"
                        value={exercise.reps}
                        onChange={(e) => handleWorkoutExercise(index, e)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        className="form-control"
                        placeholder="Optional"
                        value={exercise.weight}
                        onChange={(e) => handleWorkoutExercise(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={addExercise}>
                + Add Another Exercise
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Save Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkout;
