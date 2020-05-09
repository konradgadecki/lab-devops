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
    .query('CREATE TABLE IF NOT EXISTS counter_value (number INT)')
    .catch(error => console.log(error));

pgClient
    .query('CREATE TABLE IF NOT EXISTS nwd_value (number INT)')
    .catch(error => console.log(error));

pgClient
    .query('CREATE TABLE IF NOT EXISTS death_rate (rate TEXT)')
    .catch(error => console.log(error));

// Redis Client Setup
const redisClient = redis.createClient({
   host: keys.redisHost,
   port: keys.redisPort,
   retry_strategy: () => 1000
});

redisClient.set('counter_value', 0);
redisClient.set('nwd_value', 0);
redisClient.set('death_rate', 0);

app.get('/api/', (req, res) =>{
    console.log("Response from backend.");
    res.send("Response from backend.");
});

app.post("/api/rate", (req, res) => {
    const { cases, deaths } = req.body;
    const deathRate = parseInt(deaths) / parseInt(cases);

    console.log(deathRate);
    
    redisClient.set('death_rate', deathRate);

    pgClient.connect()
        .then(() => console.log("Connected successfully"))
        .then(() => pgClient.query("INSERT INTO death_rate(rate) VALUES("+deathRate+")"))
        .catch(e => console.log(e));    

    res.send("Cases: " + cases + " Deaths: " + deaths + " Death rate: " + deathRate);    
});

app.get('/', (req, res) =>{
    console.log("testtest");
    // const nwdResult = getNwd(url.parse(req.url,true).query);

    let incrementedCounterValue;
    redisClient.get('counter_value', (err, counter_value) => {
        console.log("Current counter value from Redis: " + counter_value);
        incrementedCounterValue = parseInt(counter_value) + 1;
        redisClient.set('counter_value', incrementedCounterValue);
    });

    redisClient.get('nwd_value', (err, nwd_value) => {
        console.log("Current nwd from Redis: " + nwd_value);
        redisClient.set('nwd_value', 2);
    });
    
    pgClient.connect()
        .then(() => console.log("Connected successfully"))
        .then(() => pgClient.query("INSERT INTO counter_value(number) VALUES("+incrementedCounterValue+")"))
        .then(() => pgClient.query("INSERT INTO nwd_value(number) VALUES("+2+")"))
        .catch(e => console.log(e));    


    // console.log("Najwiekszy wspolny dzielnik ("+ a + ", " + b + "): " + nwd(a, b));

    res.send("Thanks for visiting.");
});

getNwd = (queryObject) => {
    a = parseInt(queryObject.l1);
    b = parseInt(queryObject.l2);
    const nwdResult = parseInt(nwd(a, b));

    return nwdResult;
}

nwd = (a, b) => {
    while (a != b) {
        if (a < b) {
          pom = a; a = b; b = pom;
        } 
        a = a - b;
      }
      return a;
}

app.listen(5000, () =>{
    console.log("Lisening on port 8080...");
});