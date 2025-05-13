// const Product = require('./models/product.model')

// const sp=[ {
//     "name": "Men's Jacket",
//     "category": "Men",
//     "subcategory": "Jackets",
//     "brand": "ABC",
//     "description": "Stylish winter jacket.",
//     "price": 1999,
//     "discount_price": 1499,
//     "size": ["M", "L", "XL"],
//     "color": ["Black", "Gray"],
//     "fabric": "Polyester",
//     "pattern": "Solid",
//     "sleeve_length": "Full Sleeve",
//     "fit": "Slim",
//     "occasion": "Casual",
//     "stock": 30,
//     "images": ["https://yourdomain.com/images/jacket.jpg"]
//   },
//   {
//     "name": "Casual Denim Shirt",
//     "category": "Men",
//     "subcategory": "Shirts",
//     "brand": "Levi's",
//     "description": "Classic denim shirt for a rugged look.",
//     "price": 1599,
//     "discount_price": 1299,
//     "size": ["S", "M", "L", "XL"],
//     "color": ["Blue", "Dark Blue"],
//     "fabric": "Denim",
//     "pattern": "Plain",
//     "sleeve_length": "Full Sleeve",
//     "fit": "Regular",
//     "occasion": "Casual",
//     "stock": 50,
//     "images": ["https://yourdomain.com/images/denim_shirt.jpg"]
//   },
//   {
//     "name": "Formal Slim Fit Trousers",
//     "category": "Men",
//     "subcategory": "Trousers",
//     "brand": "Van Heusen",
//     "description": "Elegant slim-fit trousers for office wear.",
//     "price": 2499,
//     "discount_price": 1999,
//     "size": ["30", "32", "34", "36", "38"],
//     "color": ["Black", "Gray"],
//     "fabric": "Cotton Blend",
//     "pattern": "Solid",
//     "sleeve_length": "N/A",
//     "fit": "Slim",
//     "occasion": "Formal",
//     "stock": 40,
//     "images": ["https://yourdomain.com/images/formal_trousers.jpg"]
//   },
//   {
//     "name": "Men's Hooded Sweatshirt",
//     "category": "Men",
//     "subcategory": "Sweatshirts",
//     "brand": "Puma",
//     "description": "Cozy and stylish hooded sweatshirt.",
//     "price": 1799,
//     "discount_price": 1399,
//     "size": ["M", "L", "XL", "XXL"],
//     "color": ["Red", "Blue", "Black"],
//     "fabric": "Cotton Blend",
//     "pattern": "Printed",
//     "sleeve_length": "Full Sleeve",
//     "fit": "Regular",
//     "occasion": "Casual",
//     "stock": 35,
//     "images": ["https://yourdomain.com/images/hoodie.jpg"]
//   }
//   ]

//   const insert=async()=>{
//     try{
//         await Product.insertMany(sp);
//         console.log("✅ Products inserted successfully!");
//     }catch(error){
//         console.log(error);
//     }
    


//   }
//   insert()

const User=require("./models/user.model")
const insert=async()=>{
  try{
    await User.updateOne(
  { email: 'shivanandhanj.22cse@kongu.edu' }, // or by _id
  {
    $set: {
      MobileNumber: '8778733212',
      shippingAddress: {
        address: '311/F, Nethaji Road, Oldpet',
        city: 'krishnagiri',
        postalCode: '625001',
        State: 'Tamilnadu'
      },
      profileImage: 'https://res.cloudinary.com/dhccogyze/image/upload/v1747157564/1200px-Basil_Joseph_2023__28cropped_29_lbklo5.jpg',
      favoriteCategories: ['Cotton', 'Silk'],
      preferences: {
        notifications: true,
        newsletter: true,
        fabricAlerts: false,
        currency: 'USD',
        measurementUnit: 'Inches'
      },
      measurements: {
        bust: '34',
        waist: '28',
        hips: '36'
      },
      patternSizes: [
        {
          name: 'Kurta',
          size: 'M',
          standard: 'Indian'
        }
      ],
      lastLogin: new Date(),
      isActive: true
    }
  }
);

  }catch(err){
    console.log(err);
  }
}

insert();

