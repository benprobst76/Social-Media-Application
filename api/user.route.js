const express = require('express');
const userRoutes = express.Router();

// Require User model in our routes module
let User = require('./user.model');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let user = new User(req.body);
  user.isLogin = true;
  user.save()
    .then(() => {
      res.status(200).json({'business': 'business is added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
  console.log(req);
    User.find(function(err, users){
    if(err){
      res.json(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      if(err) {
        res.json(err);
      }
      res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("data is not found");
    else {
        user.bio = req.body.bio;
        user.website = req.body.website;
        user.location = req.body.location;
        user.isLogin = req.body.isLogin;
        user.imageUrl = req.body.imageUrl;
        user.handle = req.body.handle;
        user.email = req.body.email;
        user.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').delete(function (req, res) {
    console.log(req.body);
    console.log(req.params);

    User.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
          //console.log(err);
         res.json(err);
        }else {
          User.find(function(err, users){
            if(err){
              res.json(err);
            }
            else {
              res.json(users);
            }
          });
        }
    });
});

module.exports = userRoutes;