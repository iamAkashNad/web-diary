const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "iamak@shnadandiama$oftwareengineer";

const User = require("../models/user.model");
const loginValidation = require("../validations/user/login.validation");
const signupValidation = require("../validations/user/signup.validation");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if(!signupValidation(name, email, password)) {
        return res.json({ message: "Invalid Input!" });
    }
    const existingUser = await User.findOne({ email: email });
    
    if(existingUser) {
        return res.status(400).json({ message: "User already exists with the email!" });
    }
    const hashPassword = await bcryptjs.hash(req.body.password, 12);
    req.body.password = hashPassword;
    const user = new User(req.body);
    let result;
    try {
        result = await user.save();
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
    res.json({ message: "User created successfully!" });
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!loginValidation(email, password)) {
        return res.status(400).json({ message: "Invalid input - please enter some valid ones!" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }

    if(!existingUser) {
        return res.status(404).json({ message: "Please enter correct credentials!" });
    }

    const isMatched = await bcryptjs.compare(password, existingUser.password);

    if(!isMatched) {
        return res.status(400).json({ message: "Please enter correct credentials!" });
    }

    //Tracking User Authentication status.
    const payloadData = {
        userId: existingUser._id,
    };

    const authToken = jwt.sign(payloadData, JWT_SECRET);

    res.json({ message: "Logged in successfully!", authToken });
};

const getUser = async (req, res) => {
    let user
    try {
        user = await User.findOne({ _id: res.locals.authUserId }, { password: 0 });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong internally!" });
    }
    res.json(user);
};

const logout = (req, res) => {};

module.exports = {
    signup: signup,
    login: login,
    getUser: getUser,
    logout: logout
};
