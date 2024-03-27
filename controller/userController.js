const User = require('../model/user');
const getlanding = (req,res)=>{
    try {
        res.render("landingpage")
    } catch (error) {
        console.log("err");
    }
}
const getlogin = (req,res)=>{
    try {
        res.render("loginRegister")
    } catch (error) {
        console.log("err");
    }
}
const getsignup = (req,res)=>{
    try {
        res.render("loginRegister")
    } catch (error) {
        console.log("err");
    }
}
const postsignup = async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      await User.insertMany([data]);
      if (!req.session.id) {
        res.render("user/signup");
      } else {
        res.redirect("/");
      }
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            // Duplicate key error, email already exists
            return res.status(400).json({ message: 'Email address already exists' });
          }
          console.log(error);
          res.status(500).json({ message: 'Server Error' });
    }
  };
  
const getmyaccount = (req,res)=>{
    try {
        res.render("my-account")
    } catch (error) {
        console.log("err");
    }
}
const getmyOrder = (req,res)=>{
    try {
        res.render("myOrder")
    } catch (error) {
        console.log("err");
    }
}
const getwishlist = (req,res)=>{
    try {
        res.render("wishlist")
    } catch (error) {
        console.log("err");
    }
}


module.exports= {
    getlanding,
    getlogin,
    getmyaccount,
    getmyOrder,
    getwishlist,
    getsignup,
    postsignup
}