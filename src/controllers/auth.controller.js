const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

// User register controller
// POST - /api/auth/register

async function userRegister(req, res) {
    const { email, name, password } = req.body

    // check if email is already used or not
    const isExists = await userModel.findOne({
        email: email
    })

    if(isExists){
        return res.status(422).json({
            message: "This E-mail is already Exists",
            status: "failed"
        })
    }

    // User not exists, then create user account
    const user = await userModel.create({
        name, email, password
    })

    // Then give user a jwt token
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "3d"})

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        token
    })
}

module.exports = { userRegister }