import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';

const CreateNutrition = () => {
    const [formData, setFormData] = useState({
        user: "",
        meals: [
            {
                meal_time: "",
                food_items: [
                    {
                        food_name: "",
                        quantity: "",
                        calories: "",
                        protein: "",
                        carbs: "",
                        fats: ""
                    }
                ]
            }
        ],
        total_calories: "",
        trainer: "",
    });

    const navigate = useNavigate();

    const handleNutrition = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMeals = (index, e) => {
        const updatedMeals = [...formData.meals];
        updatedMeals[index][e.target.name] = e.target.value;
        setFormData({ ...formData, meals: updatedMeals });
    };

    const handleFoodItem = (mealIndex, foodIndex, e) => {
        const updatedMeals = [...formData.meals];
        updatedMeals[mealIndex].food_items[foodIndex][e.target.name] = e.target.value;
        setFormData({ ...formData, meals: updatedMeals });
    };

    const addFoodItem = (mealIndex) => {
        const updatedMeals = [...formData.meals];
        updatedMeals[mealIndex].food_items.push({
            food_name: "",
            quantity: "",
            calories: "",
            protein: "",
            carbs: "",
            fats: ""
        });
        setFormData({ ...formData, meals: updatedMeals });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { nutritionData } = await axiosInstance.post("nutrition/createNutrition", formData);
            if (nutritionData?.success) {
                toast.success("Nutrition created successfully");
            } else {
                toast.error("Failed to create Nutrition");
            }
            navigate("/Pages/Nutrition");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Create Nutrition</h1>
            <form onSubmit={handleSubmit}>
                {/* User Input */}
                <div className="mb-3">
                    <label htmlFor="user" className="form-label">Assigned To:</label>
                    <input
                        type="text"
                        name="user"
                        id="user"
                        className="form-control"
                        onChange={handleNutrition}
                        value={formData.user}
                    />
                </div>

                {/* Meals Section */}
                <div className="mb-3">
                    <h2>Meals</h2>
                    {formData.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="mb-3">
                            {/* Meal Time Input */}
                            <div className="mb-2">
                                <label htmlFor={`meal_time_${mealIndex}`} className="form-label">Meal Time:</label>
                                <input
                                    type="text"
                                    name="meal_time"
                                    id={`meal_time_${mealIndex}`}
                                    className="form-control"
                                    onChange={(e) => handleMeals(mealIndex, e)}
                                    value={meal.meal_time}
                                />
                            </div>

                            {/* Food Items */}
                            <div className="mb-2">
                                <h3>Food Items</h3>
                                {meal.food_items.map((foodItem, foodIndex) => (
                                    <div key={foodIndex} className="mb-2">
                                        {/* Food Name Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`food_name_${foodIndex}`} className="form-label">Food Name:</label>
                                            <input
                                                type="text"
                                                name="food_name"
                                                id={`food_name_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.food_name}
                                            />
                                        </div>

                                        {/* Quantity Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`quantity_${foodIndex}`} className="form-label">Quantity:</label>
                                            <input
                                                type="text"
                                                name="quantity"
                                                id={`quantity_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.quantity}
                                            />
                                        </div>

                                        {/* Calories Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`calories_${foodIndex}`} className="form-label">Calories:</label>
                                            <input
                                                type="number"
                                                name="calories"
                                                id={`calories_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.calories}
                                            />
                                        </div>

                                        {/* Protein Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`protein_${foodIndex}`} className="form-label">Protein:</label>
                                            <input
                                                type="number"
                                                name="protein"
                                                id={`protein_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.protein}
                                            />
                                        </div>

                                        {/* Carbs Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`carbs_${foodIndex}`} className="form-label">Carbs:</label>
                                            <input
                                                type="number"
                                                name="carbs"
                                                id={`carbs_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.carbs}
                                            />
                                        </div>

                                        {/* Fats Input */}
                                        <div className="mb-2">
                                            <label htmlFor={`fats_${foodIndex}`} className="form-label">Fats:</label>
                                            <input
                                                type="number"
                                                name="fats"
                                                id={`fats_${foodIndex}`}
                                                className="form-control"
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                value={foodItem.fats}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary" onClick={() => addFoodItem(mealIndex)}>
                                    Add Food Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Calories */}
                <div className="mb-3">
                    <label htmlFor="total_calories" className="form-label">Total Calories:</label>
                    <input
                        type="number"
                        name="total_calories"
                        id="total_calories"
                        className="form-control"
                        onChange={handleNutrition}
                        value={formData.total_calories}
                    />
                </div>

                {/* Trainer Input */}
                <div className="mb-3">
                    <label htmlFor="trainer" className="form-label">Created By:</label>
                    <input
                        type="text"
                        name="trainer"
                        id="trainer"
                        className="form-control"
                        onChange={handleNutrition}
                        value={formData.trainer}
                    />
                </div>

                {/* Submit Button */}
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Save Nutrition
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNutrition;
