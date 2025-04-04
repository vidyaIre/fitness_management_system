const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phone, role } = req.body;
    console.log("data:", firstName, lastName, email, password, phone, role);

    try {
        const user = await User.findOne({ email });
       // console.log("user email:", user);

        if (user) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            role
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role
            },
            token
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
}