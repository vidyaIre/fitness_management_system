const express = require("express");
const { registerUser, loginUser, getUserAll, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUserAll',authMiddleware,roleMiddleware('admin'),getUserAll);
router.get('/getUserById',authMiddleware, getUserById);
router.put('/updateUser', authMiddleware, updateUser);
router.delete('/deleteUser',authMiddleware, deleteUser);

module.exports = router;