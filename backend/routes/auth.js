const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

//Create user using: POST "/api/auth/createuser". No login required.
router.post('/createuser',[
    body('name', 'Name should contain minimum 3 letters.').isLength({ min: 3 }),
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'Password must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body.email });
    
    if(user){
        res.status(400).json('A user with this Email already exist.')
    }else{
        user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(user => res.json(user))
        .catch(err=> { console.log(err.message)
            res.json('Some error occurred.')});
    }

});

module.exports = router;