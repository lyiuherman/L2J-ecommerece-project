// emailController.js

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Function to send OTP email
const sendOTP = async (req, res) => {
    try {
        // Generate OTP
        const otp = generateOTP();

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'email',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password'
            }
        });

        // Render email template with OTP
        const emailTemplatePath = path.join(__dirname, '..', 'views', 'loginRegister.ejs');
        const renderedTemplate = await ejs.renderFile(emailTemplatePath, { otp });

        // Send email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: req.body.email,
            subject: 'OTP Verification',
            html: renderedTemplate
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Failed to send OTP email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { sendOTP };
