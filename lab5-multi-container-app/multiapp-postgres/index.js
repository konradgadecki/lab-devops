const express = require("express");
const redis = require("redis");

const app = express();


const client = redis.createClient({
   host: 'redis-server',
   port: 6379 
});

app.get('/', (req, resp) =>{
    resp.send("Hello from node!");
});


app.listen(8080, () =>{
    console.log("Lisening on port 8080...");
});