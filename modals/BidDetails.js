const mongoose = require ('mongoose');

const BidDetailSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    selectedId:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    bidamount:{
        type:Number,
        required:true
    }
    
})

module.exports = BidDetails = mongoose.model('bidDetails',BidDetailSchema)