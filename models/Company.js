const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Bank', 'Investment Bank', 'stock Exchange']
  },
  country: {
    type: String,
    enum: ['Nigeria', 'Ukraine', 'Tchad', 'Azerbadjan']
  },
  description: {
    type: String
  },
  nominated: {
    type: Boolean,
    default: 'no'
  },
  assignedTo: {
    type: String,
    enum: ['Tanya', 'Sasha', 'Anna'],
    default: 'Tanya'
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Company = mongoose.model('company', CompanySchema);
