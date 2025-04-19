import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosConfig";

function CreateWorkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    title: '',
    description: '',
    exercises: [{
      name: '',
      sets: '',
      reps: '',
      weight: ''
    }]
  });
  const navigate = useNavigate();

  const handleWorkout = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    console.log("Payload from createworkout is:", payload);
    try {
      const { data } = await axiosInstance.post("createWorkout", payload);
      console.log("data from workout is:", data);

      localStorage.setItem("@token", JSON.stringify(data?.token));
      localStorage.setItem("@user", JSON.stringify(data?.user));
      console.log("token is:", data?.token);
      console.log("user is:", data?.user);

      if (data?.success) {
        toast.success("ctreated workout successfully");
      } else {
        toast.error("created workout failed");
      }
      navigate("/Pages/createWorkout");
      return;

    } catch (error) {
      console.log("Error in create workout is:", error);
      toast.error("created workout failed");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🏋️ Create New Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleWorkout}
          placeholder="Workout Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleWorkout}
          placeholder="Workout Description"
          className="w-full border p-2 rounded"
          required
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Exercises</h3>
        { formData.exercises.map((exercise, index) =>(
          <div key={''} className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={''}
              onChange={''}
              placeholder="Exercise Name"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="sets"
              value={''}
              onChange={''}
              placeholder="Sets"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="reps"
              value={''}
              onChange={''}
              placeholder="Reps"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="weight"
              value={''}
              onChange={''}
              placeholder="Weight (kg)"
              className="border p-2 rounded"
            />

            <button type="button" onClick={''} className="text-red-600 text-sm col-span-4 text-right">
              Remove
            </button>

          </div>
        ))
        }

        <button type="button" onClick={''} className="bg-green-600 text-white px-4 py-2 rounded">
          + Add Exercise
        </button>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 block">
          Create Workout
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;
