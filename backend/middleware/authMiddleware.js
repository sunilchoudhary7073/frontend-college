const { Tokenverify } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const decoded = await Tokenverify(token);

        console.log("DECODED TOKEN:", decoded);

        // decoded ko request ke andar save karo
        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;