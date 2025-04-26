const express = require("express");
const { registerUser, loginUser, getUserAll, getUserById, updateUser, deleteUser, verifyOtp } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
const { verify } = require("jsonwebtoken");
const router = express.Router();

router.post('/registerUser',upload.single('image'), registerUser);
router.post('/verifyOtp',verifyOtp);
router.post('/loginUser', loginUser);
router.get('/getUserAll',authMiddleware, getUserAll);
router.get('/getUserById',authMiddleware,roleMiddleware("admin", "trainer"), getUserById);
router.put('/updateUser', authMiddleware,roleMiddleware("admin", "trainer"), updateUser);
router.delete('/deleteUser',authMiddleware,roleMiddleware("admin"), deleteUser);

module.exports = router;