const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var cookieParser = require("cookie-parser")
//bring in routes waha se router export hua hai
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth')
const userRoutes = require("./routes/user")
const cors = require('cors')

// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Connected'))

  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

// const myOwnMiddleware = (req,res,next) => {
//     console.log('middleware applied');
//     next()
// }

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator());
//app.use(myOwnMiddleware);
app.use(cors());
//any  request comes to this server
app.use("/",postRoutes)
app.use('/',authRoutes);
app.use("/",userRoutes)

app.use(function (err,req,res,next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({error:"unauthorized"})
  }
})

const port = 5001
app.listen(port, () => {
    console.log(`server running on port ${port}` )
});