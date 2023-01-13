const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const getUserId = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return res.json({});
    }
    const { "auth-token": authToken } = req.headers;
    try {
        const payloadData = jwt.verify(authToken, JWT_SECRET);
        res.locals.authUserId = payloadData.userId;
    } catch(error) {
        return res.status(401).json({ invalidToken: true, message: "Authentication must required" });
    }
    next();
};

module.exports = getUserId;
