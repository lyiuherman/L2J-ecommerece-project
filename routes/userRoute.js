const {
  getlanding,
  getmyaccount,
  getOtp,
  postOtp,
  getlogin,
  postLogin,
  postSignup,
  getmyOrder,
  app,
  apps,
  getwishlist,
  auths,
  authf,
} = require("../controller/user/userController");
const express = require("express");
const router = express.Router();

// Define routes for user authentication
router.get("/login",getlogin);
router.post("/signup", postSignup,);
router.post("/login", postLogin );
router.get("/views/user/otp", getOtp);
router.post("/views/user/otp",postOtp);
router.get("/resendOTP",getOtp);
router.get("/", getlanding);
router.get("/myAccount", getmyaccount);
router.get("/myOrder", getmyOrder);
router.get("/wishlist", getwishlist);
router.get("/auth/google", app);
router.get("/auth/google/callback", apps);
router.get("/auth/google/success", auths);
router.get("/auth/google/failure", authf);

module.exports = router;
