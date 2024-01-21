// api/notes.js

const Note = require('./notesDB');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { content, position } = req.body;

    try {
      const newNote = new Note({ content, position });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
