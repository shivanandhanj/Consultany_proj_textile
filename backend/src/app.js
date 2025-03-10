require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const product=require('./routes/product.routes');
const review=require('./routes/review.routes');
const addProd=require('./routes/addproduct.routes');
const cart=require('./routes/cart.routes');
const Order=require('./routes/order.routes')
const Fav=require('./routes/fav.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products',product);
app.use('/api/reviews',review);
app.use('/api/admin',addProd);
app.use('/api',cart);
app.use('/api',Order);
app.use('/api',Fav);

MONGODB_URI="mongodb+srv://shivanandhanj22cse:nanzu_05@cluster0.qcf0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGODB_URI)
  .then(() => {console.log('Connected to MongoDB')
    
  })
  .catch(err => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});