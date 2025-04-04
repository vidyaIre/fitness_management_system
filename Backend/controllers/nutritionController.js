const e = require('express');
const nutrition = require('../models/nutritionModel');
const User = require('../models/userModel');

// Create a new nutrition 
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
// Get all nutrition
exports.getAllNutrition = async (req, res) => {
    try {
        const nutritionList = await nutrition.find().populate('assignedTo', 'name email').populate('createdBy', 'name email');
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: nutritionList.length,
            message: "Nutrition retrieved successfully",
            nutrition: nutritionList
        });
    } catch (error) {
        console.error("Error retrieving nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Get nutrition by user ID
exports.getNutritionByUserId = async (req, res) => {
    const { id } = req.body;
    console.log("nutrition id:", id);


    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User ID is required"
            });
        }
        const nutritionList = await nutrition.find({ _id: id }).populate('_id', 'name email').populate('createdBy', 'name email');

        if (!nutritionList || nutritionList.length === 0) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No nutrition found for this user"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            count: nutritionList.length,
            message: "Nutrition retrieved successfully",
            nutrition: nutritionList
        });
    } catch (error) {
        console.error("Error retrieving nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Update nutrition by ID
exports.updateNutritionById = async (req, res) => {
    const { id } = req.body;
    console.log("nutrition id:", id);
    const { assignedTo, meals, food_items, total_calories, createdBy } = req.body;

    try {
        const updatedNutrition = await nutrition.findByIdAndUpdate(id, {
            assignedTo,
            meals,
            food_items,
            total_calories,
            createdBy
        }, { new: true });

        if (!updatedNutrition) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Nutrition not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Nutrition updated successfully",
            nutrition: updatedNutrition
        });
    } catch (error) {
        console.error("Error updating nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Delete nutrition by ID
exports.deleteNutritionById = async (req, res) => {
    const { id } = req.body;
    console.log("nutrition id:", id);
    try {
        const deletedNutrition = await nutrition.findByIdAndDelete(id);

        if (!deletedNutrition) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Nutrition not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Nutrition deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
}