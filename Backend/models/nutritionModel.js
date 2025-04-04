const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    meals: [
        {
            meal_time: {
                type: String,
                enum: [
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Snack"
                ],
                required: true
            },


            food_items: [
                {
                    food_name: {
                        type: String,
                        required: true
                    },
                    quantity: {
                        type: String,
                        required: true
                    },
                    calories: {
                        type: Number,
                        required: true
                    },
                    protein: {
                        type: Number,
                        required: true
                    },
                    carbs: {
                        type: Number,
                        required: true
                    },
                    fats: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ],

    total_calories: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{

    timestamps: true
});
module.exports = mongoose.model('Nutrition', nutritionSchema);