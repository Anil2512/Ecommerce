const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("================================");
    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("================================");

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const parts = authHeader.split(" ");

    console.log("PARTS:", parts);

    const token = parts[1];

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;