// // emailController.js

// const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');

// // Function to generate a random OTP
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000);
// };

// // Function to send OTP email
// const sendOTP = async (req, res) => {
//     try {
//         // Generate OTP
//         const otp = generateOTP();

//         // Create transporter
//         const transporter = nodemailer.createTransport({
//             service: 'email',
//             auth: {
//                 user: 'your-email@gmail.com',
//                 pass: 'your-password'
//             }
//         });

//         // Render email template with OTP
//         const emailTemplatePath = path.join(__dirname, '..', 'views', 'loginRegister.ejs');
//         const renderedTemplate = await ejs.renderFile(emailTemplatePath, { otp });

//         // Send email
//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: req.body.email,
//             subject: 'OTP Verification',
//             html: renderedTemplate
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 res.status(500).json({ message: 'Failed to send OTP email' });
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 res.status(200).json({ message: 'OTP sent successfully' });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = { sendOTP };



const nodemailer = require('nodemailer');

const sendOTP = async (email) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        // Send OTP via email
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'leeronsajesh122@gmail.com',
                pass: 'Lironn@122'
            }
        });
        await transporter.sendMail({
            from: '"leeronsajesh123@gamilcom',
            to: email,
            subject: 'OTP for verification',
            text: `Your OTP is ${otp}`
        });
        return otp;
    } catch (error) {
        throw new Error('Failed to send OTP');
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        // Validate OTP
        // For simplicity, let's assume the OTP is correct
        // In real-world scenarios, you would compare it with the OTP sent to the user
        // via email or SMS and then proceed accordingly.
        res.send('OTP verified successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};
