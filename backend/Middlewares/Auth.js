const jwt = require("jsonwebtoken")
const UserModel = require("../Models/User")

const ensureAuthenticated = async (req, res, next) => {
    // console.log(req)
    const auth = req.headers['authorization'].split(" ")[1]
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized, JWT is required." })
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_ENCRYPT)
        // console.log(decoded)
        const user = await UserModel.findById(decoded._id);
        if (!user) return res.status(404).json({ message: "User not found", success: false });
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, JWT is wrong or expired." })
    }
}

module.exports = ensureAuthenticated