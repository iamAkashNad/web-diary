const jwt = require("jsonwebtoken");

const JWT_SECRET = "iamak@shnadandiama$oftwareengineer";

const getUserId = (req, res, next) => {
    const { "auth-token": authToken } = req.headers;
    try {
        const payloadData = jwt.verify(authToken, JWT_SECRET);
        res.locals.authUserId = payloadData.userId;
    } catch(error) {
        return res.status(401).json({ message: "Authentication must required" });
    }
    next();
};

module.exports = getUserId;
