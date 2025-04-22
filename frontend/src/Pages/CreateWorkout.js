import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosConfig";


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

  const navigate = useNavigate();

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
      exercises: [
        ...formData.exercises,
        { name: "", sets: "", reps: "", weight: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("workout/createWorkout", formData);
      console.log("data from create workout:", data);
      const token = localStorage.getItem("@token");
      const user = localStorage.getItem("@user");
      console.log("token is:",token);
      console.log("user is:", user);
      if (data?.success) {
        toast.success("Workout created successfully");

      } else {
        toast.error("Failed to create workout");
      }
      navigate("/Pages/Workouts");
      return;

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          💪 Create Your Workout Plan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">User:</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleWorkout}
              placeholder="e.g., user"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          {/* Workout Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Workout Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleWorkout}
              placeholder="e.g., Chest Day"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* Workout Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Workout Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleWorkout}
              placeholder="Describe your workout plan..."
              rows="4"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* Exercises Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">🏋️ Exercises</h2>

            {formData.exercises.map((exercise, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Exercise Name</label>
                    <input
                      type="text"
                      name="name"
                      value={exercise.name}
                      onChange={(e) => handleWorkoutExercise(index, e)}
                      placeholder="e.g., Bench Press"
                      className="w-full border px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Sets</label>
                    <input
                      type="number"
                      name="sets"
                      value={exercise.sets}
                      onChange={(e) => handleWorkoutExercise(index, e)}
                      placeholder="e.g., 3"
                      className="w-full border px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Reps</label>
                    <input
                      type="number"
                      name="reps"
                      value={exercise.reps}
                      onChange={(e) => handleWorkoutExercise(index, e)}
                      placeholder="e.g., 12"
                      className="w-full border px-4 py-2 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={exercise.weight}
                      onChange={(e) => handleWorkoutExercise(index, e)}
                      placeholder="Optional"
                      className="w-full border px-4 py-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExercise}
              className="text-blue-600 hover:underline"
            >
              + Add Another Exercise
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600  px-6 py-2 rounded-lg"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>


  );
}

export default CreateWorkout;
