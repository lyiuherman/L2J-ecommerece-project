const mongoose = require("mongoose");




const customerschema = new mongoose.Schema({
    
    producttitle:{

    },
Fulldescriptions:{
 type:String,
 required: true
},
Regularprice:{
    type:String,
    required: true
},
Promotionalprice:{
    type:String,
    required: true
},
Taxrate:{
    type:String,
    required: true
},
Width:{
    type:String,
    required: true
},
Height:{
    type:String,
    required: true
},
Shippingfees:{
    type:String,
    required: true
},
Weight:{
    type:String,
    required: true
},
createdAt:{
    type:Date,
  
},
updatedAt:{
    type:Date
}
  
});

const Customer = new mongoose.model("Customer", customerschema);

module.exports = Customer
