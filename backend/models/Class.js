const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  teacher: { type: String, required: true }
});

module.exports = mongoose.model('ClassCode', classSchema);
