const mongoose = require("mongoose");



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
