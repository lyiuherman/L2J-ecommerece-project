const User = require("../../model/user");
const bcrypt = require("bcrypt");
const router = require("../../routes/userRoute");
const transport = require("../../services/sentOTP");
require("dotenv").config();
const path = require("path");
const otp = require("./otp");
const userData = require("../../model/user");
const passport = require('passport');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAILPASSWORD,
  },
});

// const securePassword =async (password)=>{
//   try {
//     const passwordHash = await bcrypt.hash(password,10);
//     return passwordHash
//   } catch (error) {

//   }
// }

const getlogin = async (req, res) => {
  try {
    res.render("loginRegister");
  } catch (error) {
    console.log("errorRendering login");
  }
};
// const getotp = (async(req,res)=>{
//   try {
//     res.render("otp")

//   } catch (error) {
//     console.log("errorRendering otp");
//   }
// })
// const signup = async (req, res) => {
//   try {
//       const { email, password } = req.body;
//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//           return res.status(400).send('User already exists');
//       }
//       // Create new user
//       const newUser = new User({ email, password });
//       await newUser.save();
//       // Request OTP
//       await otp.sendOTP(email);
//       res.redirect('/verify-otp', { email });
//   } catch (error) {
//       res.status(500).send('Internal Server Error');
//   }
// };

// const login = async (req, res) => {
//   try {
//       const { email, password } = req.body;
//       // Check if user exists
//       const user = await User.findOne({ email });
//       if (!user || user.password !== password) {
//           return res.status(401).send('Invalid email or password');
//       }
//       // Redirect to dashboard or profile page
//       res.send('Login successful');
//   } catch (error) {
//       res.status(500).send('Internal Server Error');
//   }
// };

// const requestOTP = async (req, res) => {
//   try {
//       const { email } = req.body;
//       // Check if user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//           return res.status(404).send('User not found');
//       }
//       // Request OTP
//       await otp.sendOTP(email);
//       res.render('otp', { email });
//   } catch (error) {
//       res.status(500).send('Internal Server Error');
//   }
// };

// const verifyLogin = async (req,res) =>{
//   try {

//     const email = req.body.email
//     const password =req.body.password

//   const userData =  await User.findOne({email:email})

//     if (userData) {

//       const passwordMatch = await bcrpt.compare(password,userData)
//       if(passwordMatch){
//         if(userData.is_verified === 0 ){
//           res.render("loginRegister",{message:"pplease verify you mail"})

//         }else{
//             res.redirect("/")
//         }
//       }else{
//         res.render("loginRegister",{message:"Email and password is incorrect"})

//       }

//     } else {
//       res.render("loginRegister",{message:"Email and password is incorrect"})

//     }

//   } catch (error) {
//     console.log(error);
//   }
// }

const getlanding = (req, res) => {
  try {
    res.render("landingpage");
  } catch (error) {
    console.log("err");
  }
};

const getmyaccount = (req, res) => {
  try {
    res.render("my-account");
  } catch (error) {
    console.log("err");
  }
};
const getmyOrder = (req, res) => {
  try {
    res.render("myOrder");
  } catch (error) {
    console.log("err");
  }
};
const getwishlist = (req, res) => {
  try {
    res.render("wishlist");
  } catch (error) {
    console.log("err");
  }
};

const postLogin = async (req, res) => {
  try {
    const check = await userData.findOne({ email: req.body.email });
    if (check.password == req.body.password && check.isBlocked == false) {
      req.session.isLogged = true;
      // console.log(req.session.isLogged)
      res.redirect("/");
    } else {
      res.render("user/login", {
        message: "Username or Password is incorrect",
      });
    }
  } catch (error) {
    console.log("Something went Wrong", error);
  }
};

const getOtp = async (req, res) => {
  try {
    if (req.session.otpRequest) {
      const userEmail = req.session.email;
      console.log(userEmail);
      const userDetail = await userData.findOne({ email: userEmail });
      const oneTimePassword =  Math.floor(1000 + Math.random() * 9000);
      console.log(oneTimePassword);
      req.session.OTP = oneTimePassword;
      transporter.sendMail(
        {
          from: process.env.MAIL_ID,
          to: userEmail,
          subject: "OTP Verification",
          text: "Verify Your Email Using the OTP",
          html: `<h3>Verify Your Email Using this OTP: ${oneTimePassword}</h3>`,
        },
        (err, info) => {
          if (err) {
            console.log("Error sending email:", err);
          } else {
            console.log("Email sent successfully. Message ID:", info.messageId);
          }
        }
      );
      res.render("otp");
    } else {
      res.redirect("user/loginRegister");
    }
  } catch (error) {
    console.log("something went wrong", error);
  }
};

const postOtp = async (req, res) => {
  try {
    if (req.session.OTP == req.body.otp) {
      req.session.isLogged = true;
      res.redirect("/");
    } else {
      res.render("otp", { message: "Invalid OTP" });
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
const postSignup = async (req, res) => {
  try {
    console.log(req.body);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // ConfirmPassword:req.body.ConfirmPassword
    };
    const exist = await userData.findOne({ email: req.body.email });
    console.log(exist);
    if (exist != null) {
      res.render("views/user/loginRegister", {
        message: "This is an Existing user",
      });
    } else {
      await userData.insertMany([data]);
      req.session.email = req.body.email;
      req.session.isLogged = true;
      req.session.otpRequest = true;
      res.redirect("/views/user/otp");
    }
  } catch (error) {
    console.log("Error during signup:", error);
  }
};

const app = passport.authenticate("google", { scope: 
  ["email", "profile"] });

const apps =(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

const auths = (req,res) =>{
  let name =  req.body.name
  res.render("landingpage")
}
const authf = (req,res) =>{
  res.send('something went wrong')
}

// const loadhome = async(req,res)=>{
//   try {
//     res.render("landingpage")
//   } catch (error) {
//     console.log(error.message);
//   }
// }
module.exports = {
  getlanding,
  getlogin,
  postSignup,
  getmyaccount,
  getmyOrder,
  getwishlist,
  getOtp,
  postOtp,
  postLogin,
  app,
  apps,
  auths,
  authf

};
