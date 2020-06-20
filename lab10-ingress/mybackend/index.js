const express = require('express');
const app = express();
const {v4: uuidv4 } = require('uuid');
const keys = require('./keys');
const redis = require('redis');

const uniqueId = uuidv4();

const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
});

app.get("/", (req, resp) => {
    const redisKey = "appUniqueId";
    redisClient.get(redisKey, (err, value) => {
        redisClient.set(redisKey, uniqueId);
        resp.send(`[${uniqueId}] Hello! ${value} comes from Redis.`);

    });
});

app.get("/api/", (req, resp) => {
    console.log("gowno");
});
 
app.listen(keys.backendPort, () =>{
    console.log(`Backend is lisening on port ${keys.backendPort}...`);
});


