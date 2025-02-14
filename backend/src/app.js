require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const product=require('./routes/product.routes');
const review=require('./routes/review.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products',product);
app.use('api/review',review);
MONGODB_URI="mongodb+srv://shivanandhanj22cse:04HwhUFHWBdd8UwO@cluster0.qcf0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URI)
  .then(() => {console.log('Connected to MongoDB')
    
  })
  .catch(err => console.error('MongoDB connection error:', err));

  const Product = require('./models/product.model')

  const sp=[ {
      "name": "Men's Jacket",
      "category": "Men",
      "subcategory": "Jackets",
      "brand": "ABC",
      "description": "Stylish winter jacket.",
      "price": 1999,
      "discount_price": 1499,
      "size": ["M", "L", "XL"],
      "color": ["Black", "Gray"],
      "fabric": "Polyester",
      "pattern": "Solid",
      "sleeve_length": "Full Sleeve",
      "fit": "Slim",
      "occasion": "Casual",
      "stock": 30,
      "images": ["https://yourdomain.com/images/jacket.jpg"]
    },
    {
      "name": "Casual Denim Shirt",
      "category": "Men",
      "subcategory": "Shirts",
      "brand": "Levi's",
      "description": "Classic denim shirt for a rugged look.",
      "price": 1599,
      "discount_price": 1299,
      "size": ["S", "M", "L", "XL"],
      "color": ["Blue", "Dark Blue"],
      "fabric": "Denim",
      "pattern": "Plain",
      "sleeve_length": "Full Sleeve",
      "fit": "Regular",
      "occasion": "Casual",
      "stock": 50,
      "images": ["https://yourdomain.com/images/denim_shirt.jpg"]
    },
    {
      "name": "Formal Slim Fit Trousers",
      "category": "Men",
      "subcategory": "Trousers",
      "brand": "Van Heusen",
      "description": "Elegant slim-fit trousers for office wear.",
      "price": 2499,
      "discount_price": 1999,
      "size": ["30", "32", "34", "36", "38"],
      "color": ["Black", "Gray"],
      "fabric": "Cotton Blend",
      "pattern": "Solid",
      "sleeve_length": "N/A",
      "fit": "Slim",
      "occasion": "Formal",
      "stock": 40,
      "images": ["https://yourdomain.com/images/formal_trousers.jpg"]
    },
    {
      "name": "Men's Hooded Sweatshirt",
      "category": "Men",
      "subcategory": "Sweatshirts",
      "brand": "Puma",
      "description": "Cozy and stylish hooded sweatshirt.",
      "price": 1799,
      "discount_price": 1399,
      "size": ["M", "L", "XL", "XXL"],
      "color": ["Red", "Blue", "Black"],
      "fabric": "Cotton Blend",
      "pattern": "Printed",
      "sleeve_length": "Full Sleeve",
      "fit": "Regular",
      "occasion": "Casual",
      "stock": 35,
      "images": ["https://yourdomain.com/images/hoodie.jpg"]
    }
    ]
  
    const insert=async()=>{
      try{
          await Product.insertMany(sp);
          console.log("✅ Products inserted successfully!");
      }catch(error){
          console.log(error);
      }
      
  
    }
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});