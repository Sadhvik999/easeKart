const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

function verifyAdmin(req, res, next) {
    if (req.user && req.user.accountType === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
}

module.exports = { verifyToken, verifyAdmin };
