// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  coverImage: {
    type: String, // Aquí se guarda la ruta local del archivo
    required: false
  }
});

module.exports = mongoose.model('Story', storySchema);
