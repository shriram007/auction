const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./modals/user');
const Product = require('./modals/Products')
var cors = require('cors');
const BidDetails = require('./modals/BidDetails');



const app = express ()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/auctionn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




app.post('/api/register',async (req,res)=>{
    const {email,password    
    } = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exists'});

        }
        user= new User({email,password});

        //hash password

        const salt=await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        res.json({msg:'user registred succesfully'})

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server Error')
    }
})


app.post('/api/login',async(req,res)=>{
  const {email,password}= req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({msg:'Invalid Credentials'});

    }
    const isMatch =await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({msg:"Invalid credntails"})
    }

    res.json({message:'Login Successful'})

  }
  catch(err){
    console.error(err.message);
    res.status(500).send('server error ')
  }

})



app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    res.json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Failed  backend to add product', error: error.message });
  }
});


app.get('/api/products',async (req,res)=>{
  try{
    const products =await Product.find({});
    res.json(products)

  }
  catch(err){
    console.error(err)
    res.status(500).json({message:'server errror'})
  }
})

app.get('/api/submitbid',async (req,res)=>{
  
  try{
    const bids =await BidDetails.find({});
    res.json(bids)

  }
  catch(err){
    console.error(err)
    res.status(500).json({message:'server errror'})
  }
})


app.put('/api/updatebid/:showId',async(req,res)=>{
  const id = req.params.showId;
  const newAmount =req.body.bidamount;
  try{
    const result = await BidDetails.findByIdAndUpdate(id,{bidamount:newAmount})
    res.status(200).json({message:'Bid amount updated successfully'})
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('server error ')
  }
})



app.post('/api/submitbid',async(req,res)=>{
  const {selectedId,email}= req.body;
  // console.log(JSON.stringify(req.body));

  try{
    const existingDocument = await BidDetails.findOne({selectedId,email});
    if(existingDocument){
      return res.status(400).json({message:"You Can Apply for bid once"})
    }

    const newBiddingData = new BidDetails(req.body);
    await newBiddingData.save();

    res.status(200).json({message:"Bid details Uploaded"});

  }
  catch(error){
    res.status(500).json({error:"Internal Server errorr"})
  }
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const PORT =5000;
app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
