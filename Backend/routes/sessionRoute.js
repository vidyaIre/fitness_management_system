const express = require('express');
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
} = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createSession',authMiddleware, createSession);
router.get('/getAllSessions',authMiddleware, getAllSessions);
router.get('/getSessionById',authMiddleware, getSessionById);
router.put('/updateSession',authMiddleware, updateSession);
router.delete('/deleteSession',authMiddleware, deleteSession);
module.exports = router;
