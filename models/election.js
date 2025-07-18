const User=require('../models/user')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electionSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  candidates: [
    {
      name: { type: String, required: true },
      party: { type: String, required: true },
      age: Number,
      voteCount: { type: Number, default: 0 },
      votes: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          votedAt: { type: Date, default: Date.now },
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Election', electionSchema);
