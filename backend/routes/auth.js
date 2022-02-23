const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

router.post('/',[
    body('name', 'Name should contain minimum 3 letters.').isLength({ min: 3 }),
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'Password must have minimum 5 letters').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err => res.json({error: `Email already exist.`}));

});

module.exports = router;