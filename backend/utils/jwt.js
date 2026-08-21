const jwt = require("jsonwebtoken");

const JWT_SECRET = "tyt5tyu8665fgfuy76t54ttyyu68ii67vhgv567ttyg";

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });
};

const Tokenverify = (token) => {
    return jwt.verify(token,JWT_SECRET);
};

module.exports = {
    generateToken,
    Tokenverify
};