
const User=require('../models/user.model');
const Product=require('../models/product.model');
const Fav=require('../models/fav.model');
const addfav = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log("fav came to backend")

        // Check if User and Product exist
        const user = await User.findById(userId);
        const product = await Product.findById(productId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check if the favorite entry already exists
        const existingFav = await Fav.findOne({ user: userId, products: productId });
        if (existingFav) return res.status(400).json({ message: "Product is already in favorites" });

        // If no existing favorite, add it
        let favEntry = await Fav.findOne({ user: userId });
        if (!favEntry) {
            favEntry = new Fav({ user: userId, products: [productId] });
        } else {
            favEntry.products.push(productId);
        }

        await favEntry.save();
        res.status(200).json({ message: "Added to favorites", favorites: favEntry.products });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }


};
const viewfav=async(req,res)=>{
    try{
        
        const favItems=await Fav.find({user: req.params.userId}).populate('products');
        const allProducts = favItems.flatMap(fav => fav.products);
        res.json(allProducts);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports={addfav,viewfav};