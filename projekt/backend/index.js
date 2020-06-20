const express = require("express");
const redis = require("redis");
const url = require('url');
const keys = require('./keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.json());

const uniqueId = uuidv4();

//Postgres Client set up
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase,
    password: keys.pgPassword
})
pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
    .query('CREATE TABLE IF NOT EXISTS death_rate (rate TEXT)')
    .catch(error => console.log(error))
    .then(() => console.log("PG table created"));

// Redis Client set up
const redisClient = redis.createClient({
   host: keys.redisHost,
   port: keys.redisPort,
   retry_strategy: () => 1000
});
redisClient.set('death_rate', 0);

//routings
app.get('/', (req, res) =>{
    console.log("Response from backend sent to the browser.");
    res.status(200).send(`[${uniqueId}] Hello!`);
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

app.listen(keys.backendPort, () =>{
    console.log("Backend is lisening on port " + keys.backendPort + "...");
});