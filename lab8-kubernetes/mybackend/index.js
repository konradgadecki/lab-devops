const express = require('express');
const app = express();

const {v4: uuidv4 } = require('uuid');


const appId = uuidv4();
app.get('/', (req, resp) => {
    resp.send("[" + appId + "] Hello from my backend app");
});

const backendPort = 5000;
app.listen(backendPort, () =>{
    console.log("Backend is lisening on port " + backendPort + "...");
});