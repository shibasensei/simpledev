const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post((req, res) => {
    const {username, password, email, role} = req.body;

  
    const newUser = new User({username,password,email,role});
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
  router.route('/:id').get((req, res) => {
      User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
    });
  
  
  router.route('/:id').delete((req, res) => {
      User.findByIdAndDelete(req.params.id)
          .then(() => res.json('User deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
  router.route('/update/:id').post((req, res) => {
    const {username, email, role} = req.body;
      User.findById(req.params.id)
        .then(user => {
          user.username = username;
          user.email = email;
          user.role = role
          user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });


  router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    
    if(!email.isEmail()) return res.status(400).json(errors);

    
  User.findOne({ email: email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  
  router.post("/login", (req, res) => {

  const confirm  = validateLoginInput(req.body);

    if (!confirm.isValid) {
      return res.status(400).json(confirm.errors);
    }
  const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found or wrong password" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) 
        return res.status(200);
      });
    });
  });
  

module.exports = router;