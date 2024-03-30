const UserOTPverification = require("../model/otp");
const User = require("../model/user");
const nodemailer = require("nodemailer")
const getlanding = (req, res) => {
  try {
    res.render("landingpage");
  } catch (error) {
    console.log("err");
  }
};

let transporter = nodemailer.createTransport({
  host: "smtp=mail.gmail.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const getlogin = (req, res) => {
  try {
    res.render("loginRegister");
  } catch (error) {
    console.log("err");
  }
};
const getsignup = (req, res) => {
  try {
    res.render("loginRegister");
  } catch (error) {
    console.log("err");
  }
};
const postsignup =
  ("/signup",
  async (req, res) => {
    try {
      
      res.render("loginRegister", { showOTPField: true });

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
 

const sendOTPverificationEmail = async ({ name, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailoption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "verify you email",
      // html: (
      //   <p>
      //     enter ${otp}<b> in the app to verify your email address to complete the
      //     signup</b>
      //   </p>
      // ),
    };

    const saltROund = 10;
    const hashedotp = await bcrypt.hash(otp,saltROund);
    new UserOTPverification({
      userID : __dirname,
      otp : hashedotp,
      createdAt:Date.now(),
      expireAt: Date.now()+360000,
    })

    await newOTPverification.save();
    await transporter.sendEMail(mailoption);
    res.json({
      status:"PENDING",
      message:"verification otp email sent",
      data:{
        userID:__dirname,
        email,
      }
    })
  
  } catch (error) {
    res.json({
      status:"failed",
      message:error.message
    })
  }
};

// Route to handle OTP validation
// const verifyotp = ( (req, res) => {
//     try {
//         const { otp } = req.session;
//         const { enteredOTP } = req.body;

//         if (otp && enteredOTP === otp) {
//             // OTP is valid, proceed with registration
//             res.render("/landingpage")
//             res.send('Registration successful!');
//         } else {
//             // OTP is invalid
//             res.render('loginResgister', { showOTPField: true, error: 'Invalid OTP. Please try again.' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

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

module.exports = {
  getlanding,
  getlogin,
  getmyaccount,
  getmyOrder,
  getwishlist,
  getsignup,
  postsignup,

};
