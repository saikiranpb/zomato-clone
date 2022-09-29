const express=require('express')
const MealTypeController=require('../controllers/mealTypes.js')

const router=express.Router();


router.get('/',MealTypeController.getMealTypes)

module.exports=router;