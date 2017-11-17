const mongoose = require('../config/db');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;

