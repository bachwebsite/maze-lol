const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost:27017/stickyNotesDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for notes
const noteSchema = new mongoose.Schema({
  content: String,
  position: { x: Number, y: Number }
});

const Note = mongoose.model('Note', noteSchema);

// Middleware to parse JSON
app.use(express.json());

// Route to get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new note
app.post('/api/notes', async (req, res) => {
  const { content, position } = req.body;

  try {
    const newNote = new Note({ content, position });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
