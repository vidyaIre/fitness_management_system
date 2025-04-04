const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utility/generateToken");

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
};
// Get all users
exports.getUserAll = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        if (!users) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No users found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: users.length,
            message: "Users retrieved successfully",
            users
        });

    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Get a single user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.body;
    //console.log("id:", id);
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Update a user
exports.updateUser = async (req, res) => {
    const { id, firstName, lastName, email, password, phone, role } = req.body;
    console.log("data is:", firstName, lastName, email, password, phone, role);
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
        }
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;
        user.phone = phone || user.phone;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
        }
        user.isDeleted = true;
        await user.save();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }

};

