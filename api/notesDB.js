const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
  position: { x: Number, y: Number }
});

module.exports = mongoose.model('Note', noteSchema);
