const express=require('express')
const MenuController=require('../controllers/menu')

const router=express.Router();


router.get('/:rName',MenuController.getMenu)

module.exports=router;