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
  name: { type: String,  },
  email: { type: String,  },
  password: { type: String,},
  confirmPassword: { type: String, },
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
