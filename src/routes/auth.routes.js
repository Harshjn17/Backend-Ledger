const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()

// Register API
// POST - /api/auth/register
router.post('/register', authController.userRegister)


module.exports = router