// shout.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for shout
let Shout = new Schema({
  userImage: {
    type: String
  },
  userHandle: {
    type: String
  },
  createdAt: {
    type: Date
  }, 
  body: {
  	type: String
  },
  likeCount: {
    type: Number
  },
  commentCount: {
      type: Number
  },
  comments: {
  type: Array
},
},{
    collection: 'shouts'
});

module.exports = mongoose.model('shout', Shout);