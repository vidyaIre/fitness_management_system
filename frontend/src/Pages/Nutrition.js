import React, { useEffect, useState } from 'react';
import { getAllNutrition } from '../apiUtils/nutritionApi';
import { toast } from 'react-toastify';

const Nutrition = () => {
  const [nutritionName, setNutritionName] = useState([]);
  async function fetchNutrition() {
    try {
      const nutritionData = await getAllNutrition();
      console.log("nutrition data is:", nutritionData);
      const token = localStorage.getItem("@token");
      console.log("token is:", token);
      setNutritionName(nutritionData?.nutrition);
      console.log("List of nutrition is:", nutritionData?.nutrition);


      if (nutritionData?.success) {
        toast.success("Nutrition fetched successfully");
      } else {
        toast.error("Failed to fetch nutrition");
      }
    } catch (error) {
      console.log("Error fetching Nutrition is:", error);
      toast.error("Error fetching Nutrition");
    }
  }

  useEffect(() => {
    fetchNutrition();
  },
    //eslint-disable-next-line[]);
    []
  );


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nutrition Plans</h2>
      {nutritionName.map((nutrition) => (
        <div key={nutrition._id} className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <div className="d-flex justify-content-between">
              <span><strong>Assigned To:</strong> {nutrition.assignedTo?.firstName|| "N/A"}</span>
              <span><strong>Created By:</strong> {nutrition.createdBy?.firstName || "N/A"}</span>
            </div>
          </div>
          <div className="card-body">
            <p><strong>Total Calories:</strong> {nutrition.total_calories}</p>
            {nutrition.meals.map((meal, i) => (
              <div key={i} className="mb-3">
                <h5 className="text-success">{meal.meal_time}</h5>
                <ul className="list-group list-group-flush">
                  {meal.food_items.map((food, j) => (
                    <li key={j} className="list-group-item">
                      <strong>Food:</strong> {food.food_name} |
                      <strong> Qty:</strong> {food.quantity} |
                      <strong> Cal:</strong> {food.calories}cal |
                      <strong> Protein:</strong> {food.protein}g |
                      <strong> Carbs:</strong> {food.carbs}g |
                      <strong> Fats:</strong> {food.fats}g
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Nutrition;