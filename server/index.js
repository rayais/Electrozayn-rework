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
    origin: "http://localhost:5500", // Update this to match the origin of your request
    credentials: true,
    optionSuccessStatus: 200,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use('/',userRoter)
app.use('/',orderRouter)
app.use('/',PosteRouter)
module.exports = app;

