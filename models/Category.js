const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);