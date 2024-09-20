const mongoose = require ('mongoose');

const ProductSchema = new mongoose.Schema({
   
        productName: {
          type: String,
          required: true
        },
       
        description: {
          type: String,
          required: true
        },
        category: {
          type: String,
          required: true
        },  startingPrice: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        }
        ,
        address: {
            type: String,
            required: true
          }
          ,
          city: {
            type: String,
            required: true
          }
          ,
          bidenddate: {
            type: String,
            required: true
          }
          ,
          state: {
            type: String,
            required: true
          }
          ,
          pincode: {
            type: Number,
            required: true
          }
          ,
          phoneNumber: {
            type: Number,
            required: true
          }
          ,
    email:{
        type:String,
        required:true,
        unique:true
    },
    products:{
        type:[String],
        default:[]
    }
})

module.exports = Product = mongoose.model('product',ProductSchema)