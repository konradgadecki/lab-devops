const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
   host: 'my-redis-server',
   port: 6379 
});

app.get('/', (req, res) =>{
    res.send("Hello from my node web app looser");
});

app.listen(8888, () =>{
    console.log("Lisening on port 8888...");
});