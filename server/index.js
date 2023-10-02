const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cors = require("cors");
const {userRoter}=require('./router/userRouter')
 const {PosteRouter}=require('./router/productRouter');
const {orderRouter} = require("./router/orderRouter");
app.use(
  cors({
    origin: "*", // Update this to match the origin of your request
    credentials: true,
    optionSuccessStatus: 200,
  })
);
// Configure CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500'); // Allow requests from localhost
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  next();
});


app.use(express.json());
app.use(cookieParser());

app.use('/',userRoter)
app.use('/',orderRouter)
app.use('/',PosteRouter)
module.exports = app;

