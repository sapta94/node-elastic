const express = require('express');
const app = express(); //init Express
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var settings = {
    app:app,
    client:client
}

require('./api/shows')(settings)

var ports = process.env.PORT || 5000;

//start the server
app.listen(ports);
console.log("listening on port: "+ports);