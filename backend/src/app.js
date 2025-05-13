
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const product=require('./routes/product.routes');
const review=require('./routes/review.routes');
const addProd=require('./routes/addproduct.routes');
const cart=require('./routes/cart.routes');
const Order=require('./routes/order.routes')
const Fav=require('./routes/fav.routes');
const mongoose=require('./config/database');
const User=require('./routes/user.routes')
const payment=require('./routes/payment.routes');
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
app.use('/api/user',User);
app.use('/api/payment',payment);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});