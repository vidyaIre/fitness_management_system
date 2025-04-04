const express = require('express');
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession
} = require('../controllers/sessionController');
const router = express.Router();

router.post('/createSession', createSession);
router.get('/getAllSessions', getAllSessions);
router.get('/getSessionById', getSessionById);
router.put('/updateSession', updateSession);
router.delete('/deleteSession', deleteSession);
module.exports = router;
