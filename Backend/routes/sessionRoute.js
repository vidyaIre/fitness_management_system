const express = require('express');
const { createSession } = require('../controllers/sessionController');
const router = express.Router();

router.post('/createSession', createSession);
module.exports = router;
