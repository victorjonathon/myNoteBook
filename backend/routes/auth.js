const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "This$@Azc@O0Kyc#!";

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

    try{
        let user = await User.findOne({email: req.body.email });
        
        if(user){
            res.status(400).json('A user with this Email already exist.')
        }else{
            let salt = bcrypt.genSaltSync(10);
            let userPass = bcrypt.hashSync(req.body.password, salt);
            user = User.create({
                name: req.body.name,
                email: req.body.email,
                password: userPass
            }).then(user => {
                const data = {
                    user:{
                        id: user.id
                    }
                };
                const authToken = jwt.sign(data, JWT_SECRET);
                res.status(200).json({authToken})})
            .catch(err=> { console.log(err.message)
                res.json('Some error occurred.')});
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

//Authenticate user using: POST "/api/auth/login". No login required.
router.post('/login',[
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'Password must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            res.status(500).json('Wrong email or password.');
        }else{
            const passCompare = await bcrypt.compare(password, user.password);

            if(passCompare){
                const data = {
                    user:{
                        id: user.id
                    }
                };
                const authToken = jwt.sign(data, JWT_SECRET);
                res.status(200).json({authToken})
            }else{
                res.status(500).json('Wrong email or password.');
            }
            
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

//Get user using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json({user});
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

module.exports = router;