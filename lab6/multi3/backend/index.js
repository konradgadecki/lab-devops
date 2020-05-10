const express = require("express");
const redis = require("redis");
const url = require('url');
const keys = require('./keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log(keys);

//Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.Password,
    port: keys.pgPort
})

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
    .query('CREATE TABLE IF NOT EXISTS death_rate (rate TEXT)')
    .catch(error => console.log(error));

// Redis Client Setup
const redisClient = redis.createClient({
   host: keys.redisHost,
   port: keys.redisPort,
   retry_strategy: () => 1000
});

redisClient.set('death_rate', 0);

app.get('/', (req, res) =>{
    console.log("Response from backend sent to the browser.");
    res.status(200).send("Response from backend!");
});

app.post("/rate", (req, res) => {
    const { cases, deaths } = req.body;
    var deathRate = parseInt(deaths) / parseInt(cases);
    deathRate = deathRate.toFixed(2);

    redisClient.set('death_rate', deathRate);
    
    pgClient
        .query("INSERT INTO death_rate (rate) VALUES($1)", [deathRate])
        .catch(error => console.log(error));

    const log = "Cases: " + cases + " Deaths: " + deaths + " Death rate: " + deathRate;
    console.log(log);    
    res.status(200).send(deathRate);
});

app.get('/history', (request, response) => {
    pgClient.query('SELECT * FROM death_rate', (e, result) => {
      if (!result.rows) {
        response.json([]);
      }
      else {
        response.json(result.rows);
      }
    });
  });

const backendPort = 5000;
app.listen(backendPort, () =>{
    console.log("Backend is lisening on port " + backendPort + "...");
});