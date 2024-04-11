const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());

// Middleware for enabling CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Replace with your actual MongoDB connection URI from .env
const uri = process.env.MONGO_URI || '';

// Create a MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB and start the Express server
async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with error
  }
}

startServer();

// Handle POST request to insert new marks with a new ID
app.post('/update-marks', async (req, res) => {
  const { subject1, subject2 } = req.body;

  try {
    const db = client.db(process.env.DB_NAME); // Use your MongoDB database name
    const collection = db.collection('marks');

    // Insert new marks document
    const result = await collection.insertOne({
    
      subject1: parseInt(subject1),
      subject2: parseInt(subject2)
    });

    if (result.insertedCount === 1) {
      res.status(201).json({ message: 'Marks inserted successfully', id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to insert marks' });
    }
  } catch (error) {
    console.error('Error inserting marks:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch all marks
app.get('/marks', async (req, res) => {
  try {
    const db = client.db(process.env.DB_NAME); // Use your MongoDB database name from .env
    const collection = db.collection('marks');

    const marks = await collection.find({}).toArray();
    res.json(marks);
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
