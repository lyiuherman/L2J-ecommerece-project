const express = require('express');
const router = express.Router();
const {
    getlanding,
    getlogin,
    getsignup,
    postsignup,
    getmyaccount,
    getmyOrder,
    getwishlist
}= require("../controller/userController")

router.get("/",getlanding);
router.get("/login",getlogin);
router.get("/signup",getsignup);
router.post("/signup",postsignup);
router.get("/myAccount",getmyaccount);
router.get("/myOrder",getmyOrder);
router.get("/wishlist",getwishlist);


module.exports = router
