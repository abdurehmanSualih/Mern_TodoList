const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
  text: {type: String, required: true},
  completed: { type: Boolean, default: false }
},)

module.exports = mongoose.model('todo', todoSchema);

