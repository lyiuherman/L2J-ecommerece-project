

const {
    getHome,
    getProductDetails,
    getAdminLogin,
    postAdminLogin,
    getaddProduct,
    postaddProduct,
    app,
    apps
} =require("../controller/admin/adminContoller");

const express = require("express");
const adminRouter = express.Router();


adminRouter.get("/home",getHome);
adminRouter.get("/addProduct",getaddProduct);
adminRouter.post("/addProduct",postaddProduct);
adminRouter.get("/Product",getProductDetails);
adminRouter.get("/Login", getAdminLogin);

adminRouter.post("/LoginPost", postAdminLogin);


module.exports = adminRouter