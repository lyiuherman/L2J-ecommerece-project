const user = require("../../model/admin/adminmongo");
const Customer = require("../../model/admin/customer");


const getAdminLogin = (req, res) => {
  // console.log("wefwr");
  try {
    if (!req.session.user) {
      res.render("adminLogin");
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
};
const postAdminLogin = async (req, res) => {
  console.log("inside admin login");
  try {
    let admin = req.body.name;
    const check = await user.findOne({ name: admin });
    console.log(check);
    if (check && check.password === req.body.password) {
      console.log(check);

      req.session.users = req.body.name;
      res.render("index");
    } else {
      res.send("Wrong username or password");
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send("Internal server error");
  }
};
const getHome = (req, res) => {
  console.log("vsfvfdbd");
  try {
    res.render("admin/index");
  } catch (error) {
    console.log(error);
  }
};
const getProductDetails = (req, res) => {
  try {
    res.render("admin/productDetails");
  } catch (error) {
    console.log(error);
  }
};
const getaddProduct = (req, res) => {
  try {
    const locals = {
      title: "Add New Customers",
    };

    res.render("admin/addProduct");
  } catch (error) {
    console.log(error);
  }
};
const postaddProduct = async (req, res) => {
  try {
    console.log(req.body);

    // // Check if all required fields are present in the request body
    // const requiredFields = ['producttitle', 'Fulldescriptions', 'Regularprice', 'Promotionalprice', 'Taxrate', 'Width', 'Height', 'Shippingfees', 'Weight'];
    // // const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

    // if (missingFields.length > 0) {
    //     return res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
    // }

    // Create a new customer with the provided data
    const newCustomer = new Customer({
      producttitle: req.body.producttitle,
      Fulldescriptions: req.body.Fulldescriptions,
      Regularprice: req.body.Regularprice,
      Promotionalprice: req.body.Promotionalprice,
      Taxrate: req.body.Taxrate,
      // Width: req.body.Width,
      // Height: req.body.Height,
      // Shippingfees: req.body.Shippingfees,
      // Weight: req.body.Weight,
    });
    console.log(newCustomer);
    // Save the new customer to the database
    await newCustomer.save();
    res.redirect("/admin/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};



// const postEditProduct = async (req, res) => {
//   try {
//       const { productId } = req.params;
//       const updatedProduct = req.body; // Assuming req.body contains updated product data
//       await Product.findByIdAndUpdate(productId, updatedProduct);
//       res.redirect('/admin/product');
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//   }
// };

// const getDeleteProduct = async (req, res) => {
//   try {
//       const product = await Product.findById(req.params.productId);
//       if (!product) {
//           return res.status(404).send('Product not found');
//       }
//       res.render('admin/deleteProduct', { product });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//   }
// };

// const postDeleteProduct = async (req, res) => {
//   try {
//       const { productId } = req.params;
//       await Product.findByIdAndDelete(productId);
//       res.redirect('/admin/product');
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//   }
// };

module.exports = {
  getHome,
  getProductDetails,
  getAdminLogin,
  postAdminLogin,
  getaddProduct,
  postaddProduct,
  
  // postEditProduct,
  // postDeleteProduct,
  // getDeleteProduct,
};
