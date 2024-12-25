const { signup, login, filterRoomListings, fetchUserDetails, updateUserDetails, forgotPassword, resetPassword, getProducts, postOrder} = require("../Controllers/AuthController");
const ensureAuthenticated = require("../Middlewares/Auth");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const upload = require("../Middlewares/ImageUploading");

const router = require("express").Router();

// router.post("/signup", signupValidation, signup)
router.post("/signup", signup)
// router.post("/login", loginValidation, login)
router.post("/login", login)

router.post("/filterRoomListings", filterRoomListings)
router.get("/fetchUserDetails", ensureAuthenticated, fetchUserDetails)
router.post("/updateUserDetails", ensureAuthenticated, updateUserDetails)
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword/:id/:token", resetPassword)
router.get("/products/:category", getProducts)
router.post("/order", postOrder)

module.exports = router