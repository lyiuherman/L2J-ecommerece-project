const { name } = require("ejs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 'required' ensures that this field is mandatory
  email: { type: String, required: true, unique: true }, // 'unique' ensures that each email is unique in the database
  password: { type: String, required: true, minlength: 6 }, // 'minlength' ensures that the password has at least 6 characters
  // confirmPassword: { type: String, required: true }, // You might want to validate this separately in your application logic
  verified: Boolean
});


// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
