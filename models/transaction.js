const mongoose=require('mongoose');

const TransactionSchema= new mongoose.Schema({
    transaction_id:{
        type:String,
        required:true
    },
    transaction_amount:{
        type:String,
        required:true
    } 
})

module.exports= mongoose.model("Transactions",TransactionSchema,"transaction")