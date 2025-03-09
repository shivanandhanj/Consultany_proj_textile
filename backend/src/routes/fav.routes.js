const express=require("express");

const router = express.Router();
const favController=require('../controllers/fav.controller')

router.post('/fav/add',favController.addfav);
router.get('/fav/:userId',favController.viewfav);
module.exports=router;