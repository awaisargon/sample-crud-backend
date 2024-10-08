const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Please provide a color'],
  },
  model: {
    type: String,
    required: [true, 'Please provide a model'],
  },
  make: {
    type: String,
    required: [true, 'Please provide a make'],
  },
  registrationNo: {
    type: String,
    required: [true, 'Please provide a registration number'],
    unique: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category'],
  },
});

module.exports = mongoose.model('Car', carSchema);