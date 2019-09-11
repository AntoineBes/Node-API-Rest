// Config server Mongodb
// MongoClient doc https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html

const express = require ('express');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();


// set port (localhost:<port>)
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }))

// npm install mongodb --save
// MongoClient.connect(url) deprecate from new version, use MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
// db.collection error, use client.db(<dbname>)
MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true },  (err, client) => {

    const datab = client.db('ProjectDb')
    if (err) return console.log(err)
    require('./app/routes')(app, datab);
app.listen(port, () =>{
    console.log('Ok Mr.'+ port)
})
})