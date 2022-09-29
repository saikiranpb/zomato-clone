const Razorpay=require('razorpay')
const shortid=require('shortid')
const crypto=require('crypto')
const Transactions=require('../models/transaction')

var instance = new Razorpay({ 
    key_id: 'rzp_test_gh3YEGlTp3ItUt', 
    key_secret: 'kVhfIl1xmPqtN493HhLi3lIp' 
})

exports.createOrder=async(req,res)=>{

    let options= {
        amount: req.body.amount*100,  
        currency: "INR",  
        receipt: shortid.generate(), 
        notes: {    
            key1: "value3",    
            key2: "value2"  }
        }
try{
    const response= await instance.orders.create(options)
    console.log(response)
    res.json(response)
}
catch(error){
    console.log(error)
}

}

exports.saveOrder=(req,res)=>{

    const generated_signature=crypto.createHmac('sha256',instance.key_secret);
    generated_signature.update(req.body.razorpay_orderid+"|"+req.body.razorpay_paymentid);

    if(req.body.razorpay_signature==generated_signature.digest('hex')){
        console.log("creare transaction object");
        const transaction=new Transactions({
            transaction_id:req.body.razorpay_paymentid,
            transaction_amount:req.body.razorpay_amount
        })

    transaction.save(function(err,saveTransaction){
        if(err)
        {
            console.log("error")   
            return res.status(500).send("some error occurred",error)
        }
        res.status(200).send({transaction:transaction})
    })
    }

}
  