const express = require("express");
const { registerUser, loginUser, getUserAll, getUserById , updateUser, deleteUser} = require("../controllers/userController");
const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUserAll',getUserAll);
router.get('/getUserById', getUserById);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

module.exports = router;