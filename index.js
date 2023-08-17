const app = require("./server/index");
const express = require("express")
const port = 5500;
const path = require("path");
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.json()); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});


app.listen(port,() => {
  console.log(`Backend server is running!  http://localhost:${port}`);
});