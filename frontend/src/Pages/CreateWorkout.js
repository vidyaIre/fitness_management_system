import React from "react";

function CreateWorkout() {
 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🏋️ Create New Workout</h2>
      <form onSubmit={''} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={''}
          onChange={''}
          placeholder="Workout Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={''}
          onChange={''}
          placeholder="Workout Description"
          className="w-full border p-2 rounded"
          required
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Exercises</h3>
        
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
