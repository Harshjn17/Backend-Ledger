const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    // email - String, required, no-space, lowercase, validate, unique
    email: {
        type: String,
        required: [true, "Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"],
        unique: [true, "Email already Exists"],

    },
    // Name - String, required
    name: {
        type: String,
        required: [true, "Name is required for creating a account"],
    },
    password: {
        type: String,
        required: [true, "Password is required for creating your account"],
        minlength: [6, "Password should contain more than 6 characters"],
        select: false // by default password any query me nhi aayega
    }
}, {
    // created and updated time
    timestamps: true
})

// Whenever you save user data firstly this functions runs

userSchema.pre("save", async function () {
    // pre("save") --> Before saving a user document to MongoDB, run this function.
    // Check if user password is changed --> so convert it to hash
    if(!this.isModified('password')){
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return;
})

userSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password)
    return bcrypt.compare(password, this.password)
}


// Usermodel

const userModel = mongoose.model('user', userSchema)

module.exports = userModel