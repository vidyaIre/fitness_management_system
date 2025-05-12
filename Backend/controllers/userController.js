const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utility/generateToken");
const imageUpload = require('../utility/imageUpload');
const generateOtp = require('../utility/generateOtp');
const sendOtpEmail = require('../utility/sendOtpEmail');

// Register a new user
exports.registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
        image,
        age,
        gender,
        weight,
        height,
        goal,
        memberShip,
        paymentStatus,
        specialization,
        experience,
        certification
        // otp,
        // otpExpiry,
        // isVerified
    } = req.body;
    console.log("data:", firstName, lastName, email, password, phone, role, image, age, gender, weight, height, goal, memberShip, paymentStatus, specialization, experience, certification);

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

        const cloudinaryImage = req.file ? await imageUpload(req.file.path) : null;

        const gotp = generateOtp();

        const newUserData = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            image: cloudinaryImage,
            age,
            gender,
            otp: gotp,
            otpExpiry: Date.now() + 5 * 60 * 1000,
            isVerified: false
        });
        if (role === 'user') {
            newUserData.phone = phone;
            newUserData.weight = weight;
            newUserData.height = height;
            newUserData.goal = goal;
            newUserData.memberShip = memberShip;
            newUserData.paymentStatus = paymentStatus;
        }

        if (role === 'trainer') {
            newUserData.specialization = specialization;
            newUserData.experience = experience;
            newUserData.certification = certification;
        }
        if (role === 'admin') {
            newUserData.phone = phone;
        }

        const newUser = new User(newUserData);
        await newUser.save();
        sendOtpEmail(email, gotp);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                firstName: newUser?.firstName,
                lastName: newUser?.lastName,
                email: newUser?.email,
                phone: newUser?.phone,
                role: newUser?.role,
                image: newUser?.image,
                age: newUser?.age,
                gender: newUser?.gender,
                weight: newUser?.weight,
                height: newUser?.height,
                goal: newUser?.goal,
                memberShip: newUser?.memberShip,
                paymentStatus: newUser?.paymentStatus,
                specialization: newUser?.specialization,
                experience: newUser?.experience,
                certification: newUser?.certification,
                otp: newUser?.otp,
                otpExpiry: newUser?.otpExpiry,
                isVerified: newUser?.isVerified


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
   
    try {
        const { email, password } = req.body;
        console.log("Emal & password:", email, password);
        if (!email || !password) {
            return res.status(400).json({   
                success: false,
                statusCode: 400,
                message: "Please provide email and password"
            });
        }
        const user = await User.findOne({ email });
        console.log("user is:", user);
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

        //console.log("Userssssssss    ", users);
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
    const { id } = req.params;
    console.log("id is:", id);
    try {
        const user = await User.findById(id);
        console.log("Found user : ", user);
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
    const { id } = req.query;
    console.log("id from updateuserin backend:", id);
    const { 
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
        image,
        age,
        gender,
        weight,
        height,
        goal,
        memberShip,
        paymentStatus,
        specialization,
        experience,
        certification } = req.body;
    console.log("data:", firstName, lastName, email, password, phone, role, image, age, gender, weight, height, goal, memberShip,paymentStatus, specialization, experience, certification);
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
        user.age = age || user.age;
        user.image = image || user.image;
        user.gender = gender || user.gender;
        user.weight = weight || user.weight;
        user.height = height || user.height;
        user.goal = goal || user.goal;
        user.memberShip = memberShip || user.memberShip;
        user.paymentStatus = paymentStatus || user.paymentStatus;
        user.specialization = specialization || user.specialization;
        user.experience = experience || user.experience;
        user.certification = certification || user.certification;

        

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
        const { id } = req.query;
        console.log("id is:", id);
        const user = await User.findById(id);
        console.log("user is:", user);
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
exports.verifyOtp = async (req, res) => {
    console.log("email verification");
    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

        if (user.otp !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "User verified successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        localStorage.clear();
    }
};


