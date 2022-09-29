const express=require('express')
const PaymentController=require('../controllers/payment')

const router=express.Router();


router.post('/',PaymentController.createOrder)
router.post('/save',PaymentController.saveOrder)

module.exports=router;