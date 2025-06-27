const express = require('express');
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession,
    getAllSessionsByUserId
} = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/createSession', authMiddleware, roleMiddleware("trainer"), createSession);
router.get('/getAllSessions', authMiddleware, roleMiddleware("trainer", "admin", "user"), getAllSessions);
router.get('/getSessionById', authMiddleware, roleMiddleware("trainer", "admin", "user"), getSessionById);
router.put('/updateSession', authMiddleware, roleMiddleware("trainer", "admin", "user"), updateSession);
router.delete('/deleteSession', authMiddleware, roleMiddleware("trainer", "admin"), deleteSession);
router.get('/getAllSessionsByUserId/:id', authMiddleware, roleMiddleware("user"), getAllSessionsByUserId);
module.exports = router;
