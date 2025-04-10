const express = require("express");
const { registerUser, loginUser, getUserAll, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUserAll',authMiddleware,roleMiddleware("admin"), getUserAll);
router.get('/getUserById',authMiddleware,roleMiddleware("admin", "trainer"), getUserById);
router.put('/updateUser', authMiddleware,roleMiddleware("admin", "trainer"), updateUser);
router.delete('/deleteUser',authMiddleware,roleMiddleware("admin"), deleteUser);

module.exports = router;