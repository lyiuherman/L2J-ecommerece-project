const mongoose = require("mongoose")
const schema = mongoose.Schema;

const UserOTPverificationSchema = new schema({
    userID:String,
    otp : String,
    createdAt: Date,
    expireAt: Date,
});

const UserOTPverification =mongoose.model(
    "userOTPverification",
    UserOTPverificationSchema
)
module.exports = UserOTPverification