const nutrition = require('../models/nutritionModel');
const User = require('../models/userModel');

// Create a new nutrition 
exports.createNutrition = async (req, res) => {
    const { assignedTo, meals, food_items, total_calories, createdBy } = req.body;
    console.log("data is :",req.body);
    // const userName = await User.findOne({ firstName: user });
    // const trainerName = await User.findOne({ firstName: trainer });
    // console.log("assignedTo:",userName );
    // console.log("createdBy:", trainerName);
    // req.body.meals.forEach((meal) => {
    //     console.log("meal_time:", meal.meal_time);
    //     meal.food_items.forEach((food_item) => {
    //         console.log("food_name:", food_item.food_name);
    //         console.log("quantity:", food_item.quantity);
    //         console.log("calories:", food_item.calories);
    //         console.log("protein:", food_item.protein);
    //         console.log("carbs:", food_item.carbs);
    //         console.log("fats:", food_item.fats);
    //     });
    //     console.log("total_calories:", total_calories);
    // }
    // )
   


    try {
        //const data1 = await User.findOne({ firstName: assignedTo });
        const data1 = await User.findById(assignedTo);
        console.log("user is:", data1);
        if (!data1) {
            return res.status(404).json({
                success: false,
                message: `User with name "${assignedTo}" not found`
            });
        }

       // const data2 = await User.findOne({ firstName: createdBy });
       const data2 = await User.findById(createdBy);
        console.log("trainer is:",data2);
        if (!data2) {
            return res.status(404).json({
                success: false,
                message: `Trainer with name "${createdBy}" not found`
            });
        }
        const newNutrition = new nutrition({
            assignedTo: data1._id,
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
           createdBy: data2._id
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
        console.log("Error creating nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });

    }
};
// Get all nutrition
exports.getAllNutrition = async (req, res) => {
    console.log("data form get all nutrition:", req.body);
    try {
        const nutritionList = await nutrition.find().populate('assignedTo', 'firstName email').populate('createdBy', 'firstName email');
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: nutritionList.length,
            message: "Nutrition retrieved successfully",
            nutrition: nutritionList
        });
    } catch (error) {
        console.log("Error retrieving nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Get nutrition by user ID
exports.getNutritionByUserId = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    console.log("nutrition id from nutrition controller:", id);


    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User ID is required"
            });
        }
        const nutritionList = await nutrition.find({ assignedTo: id }).populate('assignedTo', 'firstName').populate('createdBy', 'firstName email');
        //console.log("nutritionList:", nutritionList);

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
        console.log("Error retrieving nutrition:", error);
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
        console.log("Error updating nutrition:", error);
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
        console.log("Error deleting nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
exports.getNutritionById = async (req, res) => {
    const { id } = req.body;
    console.log("nutrition id from nutrition controller:", id);

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Nutrition ID is required"
            });
        }
        const nutritionData = await nutrition.findById(id).populate('assignedTo', 'firstName email').populate('createdBy', 'firstName email');
        if (!nutritionData) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Nutrition not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Nutrition retrieved successfully",
            nutrition: nutritionData
        });
    } catch (error) {
        console.log("Error retrieving nutrition:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};