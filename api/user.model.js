// user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for user
let user = new Schema({
  handle: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  imageUrl: {
    type: String
  },
  bio :{
    type: String
  },
  website :{
    type: String
  },
  location :{
    type: String
  },
  isLogin :{
      type: Boolean
  },
  createdAt: {
    type: Date
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('user', user);