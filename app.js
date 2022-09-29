const express=require('express')
const bodyParser=require('body-parser')
const restaurantRoutes=require('./routes/restaurant')
const mealTypeRoutes=require('./routes/mealTypes.js')
const locationRoutes=require('./routes/location')
const menuRoutes=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
const cors=require('cors')


const mongoose=require('mongoose')
let url=process.env.MONGO_URI||"mongodb+srv://root:root@cluster0.vyawk76.mongodb.net/zomato" 
//  "mongodb://localhost/dbSai"

mongoose.connect(url,()=>{console.log(`successfully connected to database`)})

const app=express();
const PORT=8090;


app.use(cors())
app.use(bodyParser.json())
app.use('/restaurant',restaurantRoutes)
app.use('/mealTypes',mealTypeRoutes)
app.use('/location',locationRoutes)
app.use('/menu',menuRoutes)
app.use('/payment',paymentRoutes)

//heroku
if(process.env.NODE_ENV=="production"){
    app.use(express.static("Frontend/build"))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"Frontend","build","index.html"))
    })
}

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

app.listen(PORT,()=>{
    console.log(`PORT ${PORT} is running successfully`)
})