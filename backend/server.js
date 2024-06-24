const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

// Connection URL
const url = 'https://passop-frontend.onrender.com';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

// MongoDB Connection
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectToDatabase();

// Routes
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const insertResult = await collection.insertOne(password);
  res.json({ success: true, result: insertResult });
});

app.delete('/', async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const deleteResult = await collection.deleteOne({ _id: id });
  res.json({ success: true, result: deleteResult });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
