import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';
import { getUserAll } from '../apiUtils/userApi';

const CreateNutrition = () => {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const  data  = await getUserAll();
                console.log("Fetched users data:", data); // Log full response
                if (data?.success && data?.users) {
                    // Ensure 'users' is a valid array
                    const allUsers = data.users;
                    console.log("All users fetched:", allUsers); // Log all users
    
                    // Filter users by role
                    const filteredUsers = allUsers.filter(user => user.role === 'user');
                    const filteredTrainers = allUsers.filter(user => user.role === 'trainer');
    
                    setUsers(filteredUsers);
                    setTrainers(filteredTrainers);
                } else {
                    toast.error("Failed to fetch users");
                    console.error("Invalid data structure:", data); // Log if structure is not as expected
                }
            } catch (err) {
                toast.error("Error fetching users: " + err.message);
                console.error("Error fetching users:", err); // Log error in the console
            }
        };
    
        fetchUsers();
    }, []);
    
    const [formData, setFormData] = useState({
        assignedTo: "",
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
        createdBy: "",
    });

    const [users, setUsers] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();

    const mealTimesEnum = ["Breakfast", "Lunch", "Dinner", "Snack"];
   

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
        calculateTotalCalories(updatedMeals);
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

    const addMeal = () => {
        setFormData((prev) => ({
            ...prev,
            meals: [
                ...prev.meals,
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
            ]
        }));
    };

    const calculateTotalCalories = (meals) => {
        let total = 0;
        meals.forEach(meal => {
            meal.food_items.forEach(item => {
                const qty = parseFloat(item.quantity) || 0;
                const cal = parseFloat(item.calories) || 0;
                total += qty * cal;
            });
        });
        setFormData((prev) => ({ ...prev, total_calories: total }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosInstance.post("/nutrition/createNutrition", formData);
            if (data?.success) {
                toast.success("Nutrition created successfully");
                navigate("/Pages/Nutrition");
            } else {
                toast.error("Failed to create Nutrition");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Nutrition Plan</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Assigned To:</label>
                    <select
                        className="form-select"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleNutrition}
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.firstName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <h4>Meals</h4>
                    {formData.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="border rounded p-3 mb-4">
                            <div className="mb-3">
                                <label className="form-label">Meal Time:</label>
                                <select
                                    className="form-select"
                                    name="meal_time"
                                    value={meal.meal_time}
                                    onChange={(e) => handleMeals(mealIndex, e)}
                                    required
                                >
                                    <option value="">Select Meal Time</option>
                                    {mealTimesEnum.map((time, idx) => (
                                        <option key={idx} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>

                            <h5 className="mb-2">Food Items</h5>
                            {meal.food_items.map((foodItem, foodIndex) => (
                                <div key={foodIndex} className="row g-2 mb-3">
                                    {["food_name", "quantity", "calories", "protein", "carbs", "fats"].map((field, i) => (
                                        <div key={i} className={`col-md-${field === "food_name" ? 4 : 1}`}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={field}
                                                placeholder={field.replace("_", " ").toUpperCase()}
                                                value={foodItem[field]}
                                                onChange={(e) => handleFoodItem(mealIndex, foodIndex, e)}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => addFoodItem(mealIndex)}
                            >
                                + Add Food Item
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={addMeal}
                    >
                        + Add Meal
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Calories:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="total_calories"
                        value={formData.total_calories}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Created By:</label>
                    <select
                        className="form-select"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleNutrition}
                        required
                    >
                        <option value="">Select Trainer</option>
                        {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                                {trainer.firstName}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Save Nutrition Plan
                </button>
            </form>
        </div>
    );
};

export default CreateNutrition;
