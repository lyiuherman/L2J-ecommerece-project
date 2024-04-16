const express = require("express");
const session = require('express-session');
const userRoutes = require("../L2J-ecommerece-project/routes/userRoute");
const app = express();
const morgan = require('morgan');
const flash = require('express-flash-messages')
const path = require('path');
require("./controller/user/auth");


app.set("view engine", "ejs");
// app.set('views',['./views/user',"./views/admin"])
app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));



// app.use(passport.initialize())
// app.use(passport.session())

// app.use(flash({ sessionKeyName :'flashmessage'}));

const adminrouter = require("./routes/admin");
const collection = require("./controller/admin/adminContoller");
const passport = require("passport");

app.use("/admin", adminrouter);


app.use(userRoutes);

app.listen(5080, () => {
  console.log("server runnin");
});
