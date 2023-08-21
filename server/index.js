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
<<<<<<< HEAD
    origin: "*", // Update this to match the origin of your request
=======
    origin: ["http://localhost:5500", "http://localhost:5173"], // Update this to match the origin of your request
>>>>>>> ed09f5bbc747e48ef5a5aba96a90a019b64d19fd
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

