const express = require("express");

const app = express();

app.get('/', (req, res) =>{
    res.send("Hello from my node web app looser");
});

app.listen(8888, () =>{
    console.log("Lisening on port 8888...");
});