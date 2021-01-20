const express = require('express');
const shoutRoutes = express.Router();

// Require shout model in our routes module
let Shout = require('./shout.model');
const userRoutes = require('./user.route');

// Defined store route
shoutRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let shout = new Shout(req.body);
  shout.likeCount = 0;
  shout.commentCount = 0;
  shout.save()
    .then(() => {
      res.status(200).json({'business': 'business is added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
    userRoutes.route
});

// Defined get data(index or listing) route
shoutRoutes.route('/').get(function (req, res) {
  console.log(req);
    Shout.find(function(err, shouts){
    if(err){
      res.json(err);
    }
    else {
      res.json(shouts);
    }
  });
});

// Defined edit route
shoutRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  shout.findById(id, function (err, shout){
      if(err) {
        res.json(err);
      }
      res.json(shout);
  });
});

//  Defined update route
shoutRoutes.route('/update/:id').post(function (req, res) {
    Shout.findById(req.params.id, function(err, shout) {
    if (!shout)
      res.status(404).send("data is not found");
    else {
        shout.likeCount = req.body.likeCount;
        shout.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined comment route
shoutRoutes.route('/comment/:id').post(function (req, res) {
  Shout.findById(req.params.id, function(err, shout) {
  if (!shout)
    res.status(404).send("data is not found");
  else {
      shout.commentCount = req.body.commentCount;
      shout.comments = req.body.comments;
      shout.save().then(() => {
        res.json('Update complete');
    })
    .catch(() => {
          res.status(400).send("unable to update the database");
    });
  }
});
});

// Defined delete | remove | destroy route
shoutRoutes.route('/delete/:id').delete(function (req, res) {
    Shout.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
         res.json(err);
        }else {
          Shout.find(function(err, shouts){
            if(err){
              res.json(err);
            }
            else {
              res.json(shouts);
            }
          });
        }
    });
});

module.exports = shoutRoutes;