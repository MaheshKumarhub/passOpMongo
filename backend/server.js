const express = require('express')
const app = express()

require('dotenv').config()
const bodyparser = require('body-parser')

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'https://passop-frontend.onrender.com/';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';

const cors = require('cors')



const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(cors())

client.connect();

//get all password
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

  res.json(findResult)
})

//save the password
app.post('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);

  res.send({success: true, result: findResult})
})

//Delete the password
app.delete('/', async(req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);

  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
