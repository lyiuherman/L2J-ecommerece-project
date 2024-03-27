const express = require("express");
const session = require('express-session');
const userRoutes = require("../L2J-ecommerece-project/routes/userRoute");
const app = express();

app.set("view engine", "ejs");
app.set('views','./views/user')
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));





app.use(userRoutes);

app.listen(5080, () => {
  console.log("server runnin");
});
