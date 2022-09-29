const express=require('express')
const LocationController=require('../controllers/location.js')

const router=express.Router();

router.get('/',LocationController.getLocation)

module.exports=router;