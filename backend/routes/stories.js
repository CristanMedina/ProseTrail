const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Story = require('../models/Story');

router.post('/create', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const coverImagePath = req.file ? req.file.path : null;

    const newStory = new Story({
      title,
      content,
      coverImage: coverImagePath
    });

    await newStory.save();
    res.status(201).json({ message: 'Cuento creado', story: newStory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
