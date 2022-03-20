const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
//const { ResultWithContext } = require('express-validator/src/chain');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const fs = require('fs');

const JWT_SECRET = "This$@Azc@O0Kyc#!";



//Create user using: POST "/api/auth/createuser". No login required.
router.post('/createuser',[
    body('name', 'Name should contain minimum 3 letters.').isLength({ min: 3 }),
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'Password must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user = await User.findOne({email: req.body.email });
        
        if(user){
            res.status(401).json({success:false, message: 'A user with this Email already exist.'})
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
                res.status(200).json({success:true, token: authToken})})
            .catch(err=> { console.log(err.message)
                res.statue(401).json({success:false, message: 'Some error occurred.'});
            });
        }
    }catch(error){
        res.status(500).json({success:false, message:'Internal server error.'});
    }
});

//Authenticate user using: POST "/api/auth/login". No login required.
router.post('/login',[
    body('email', 'Please enter a valid email.').isEmail(),
    body('password', 'Password must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    const success = false;
    const message = "";

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        //console.log(user);
        if(!user){
            res.status(401).json({success:false, message:'Wrong email or password.'});
        }else{
            const passCompare = await bcrypt.compare(password, user.password);

            if(passCompare){
                const data = {
                    user:{
                        id: user.id
                    }
                };
                const authtoken = jwt.sign(data, JWT_SECRET);
                res.status(200).json({success:true, authtoken:authtoken})
            }else{
                res.status(500).json({success:false, message:'Wrong email or password.'});
            }
            
        }
    }catch(error){
        //console.log(error);
        res.status(500).json({success:false, message:'Internal server error.'});
    }
});

//Get user using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    const success = false;
    const message = "";
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json({success:true, user});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Internal server error.'});
    }
});

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, './public/user-profile');
    },
    filename: (req, file, callback) =>{
        callback(null, file.originalname.toLowerCase().replace(/:/g, '-').split(' ').join('-'));
    }
});

const fileFilter = (req, file, callback) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        callback(null, true);
    }else{
        callback(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.put('/updateuser', fetchuser, upload.single('picture'), async (req, res)=>{
    const success = false;
    const message = '';
   
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(req.file){
            if(user.picture){
                const oldPicFullPath = await './public/user-profile/'+user.picture;
                fs.unlinkSync(oldPicFullPath);
            }
        }
        
        const updateUser = User.updateOne({_id: userId}, {
            name: req.body.name,
            email: req.body.email,
            picture: req.file && req.file.filename
        }).then(user => {
            const data = {
                user:{
                    id: user.id
                }
            };
            res.status(200).json({success:true, message: 'user updated successfully'})})
        .catch(err=> { console.log(err.message)
            res.status(401).json({success:false, message: 'Some error occurred.'});
        });
    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Internal server error.'});
    }
});

module.exports = router;