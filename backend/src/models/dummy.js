const mongoose=require('mongoose');
const smallschema=new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["Men", "Women"], required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true }, 
});

const smallproduct=mongoose.model("smallproduct",smallschema);
module.exports=smallproduct;