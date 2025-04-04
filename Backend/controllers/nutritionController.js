const nutrition = require('../models/nutritionModel');
const User = require('../models/userModel');

exports.createNutrition = async (req, res) => {
    const { assignedTo, meals, food_items, total_calories, createdBy } = req.body;
    console.log("assignedTo:", req.body.assignedTo);

    const userId = req.body.assignedTo;
    console.log("userId:", userId);
    req.body.meals.forEach((meal) => {
        console.log("meal_time:", meal.meal_time);
        meal.food_items.forEach((food_item) => {
            console.log("food_name:", food_item.food_name);
            console.log("quantity:", food_item.quantity);
            console.log("calories:", food_item.calories);
            console.log("protein:", food_item.protein);
            console.log("carbs:", food_item.carbs);
            console.log("fats:", food_item.fats);
        });
        console.log("total_calories:", meal.total_calories);
        console.log("createdBy:", meal.createdBy);
    }
    )


    try {
        const newNutrition = new nutrition({
            assignedTo: userId,
            meals: meals.map(meal => ({
                meal_time: meal.meal_time,
                
                food_items: meal.food_items.map(food_item => ({
                    food_name: food_item.food_name,
                    quantity: food_item.quantity,
                    calories: food_item.calories,
                    protein: food_item.protein,
                    carbs: food_item.carbs,
                    fats: food_item.fats
                })),
            })),

            total_calories: total_calories,
            createdBy: createdBy
            // meals,
            // food_items,
            // total_calories,
            // createdBy: userId
        });

        console.log("Created nutrition:", newNutrition);
        await newNutrition.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Nutrition created successfully",
            nutrition: newNutrition
        });

    } catch (error) {
        console.error("Error creating nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });

    }
};