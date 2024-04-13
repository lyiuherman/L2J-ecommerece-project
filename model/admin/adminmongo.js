const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => {
    console.log("admin-mongose connected");
  })

  .catch(() => {
    console.log("not Connected");
  });

const loginschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
 
  
});

const user = new mongoose.model("admin", loginschema);

module.exports = user
