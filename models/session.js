const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const SessionSchema = new Schema({
  user: {
    type: String  
  },
  sessionname: {
    type: String
  }
});

module.exports = Session = mongoose.model('session', SessionSchema);