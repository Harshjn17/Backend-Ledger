const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()

// Register API
// POST - /api/auth/register
router.post('/register', authController.userRegister)

// Login API
// POST - /api/auth/login
router.post('/login', authController.userLogin)

module.exports = router