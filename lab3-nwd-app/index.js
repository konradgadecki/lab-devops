const express = require("express");
const redis = require("redis");
const process = require('process');
const http = require('http');
const url = require('url');

const app = express();


const client = redis.createClient({
   host: 'redis-server',
   port: 6379 
});

client.set('counter_value', 0);
client.set('nwd_value', 0);

app.get('/', (req, resp) =>{
    client.get('counter_value', (err, counter_value) => {
        resp.send('counter_value z redis: ' + counter_value);
        client.set('counter_value', parseInt(counter_value) + 1);
    });
});

app.get('/', (req, resp) =>{

    const queryObject = url.parse(req.url,true).query;

    a = parseInt(queryObject.l1);
    b = parseInt(queryObject.l2);

    client.get('nwd_value', (err, nwd_value) => {
        resp.send('Nwd z redis: ' + nwd_value);
        client.set('nwd_value', parseInt(nwd(a, b)));
    });
    
    console.log("Najwiekszy wspolny dzielnik ("+ a + ", " + b + "): " + nwd(a, b));
});

nwd = (a, b) => {
    while (a != b) {
        if (a < b) {
          pom = a; a = b; b = pom;
        } 
        a = a - b;
      }
      return a;
}

app.listen(8080, () =>{
    console.log("Lisening on port 8080...");
});