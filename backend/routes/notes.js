const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');


//Fetch all note using: GET "/api/notes/fetechallnotes". Login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const notes = await Note.find({user: userId});
        res.status(200).json({notes});
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
    
});

//Add a note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser, [
    body('title', 'Title should contain minimum 3 letters.').isLength({ min: 3 }),
    body('description', 'Description must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {title, description, tag} = req.body;
        const user = await req.user.id;

        const noteObj = Note({
            user, title, description, tag
        });
        console.log(noteObj);
        const saveNote = await noteObj.save();
    
        res.status(200).json({saveNote});
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

//Update a note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchuser, async (req, res) => {
    try{
        const {title, description, tag} = req.body;
        const userId = await req.user.id;

        const noteObj = {};
        if(title){ noteObj.title = title }
        if(description){ noteObj.description = description }
        if(tag){ noteObj.tag = tag }
        
        let note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).send('Not Found');
        }
      
        if(note.user.toString() !== userId){
            res.status(404).send('Not Allowed');
        }else{
            const updateNote = await Note.findByIdAndUpdate(req.params.id, {$set:noteObj}, {new:true});
    
            res.status(200).json({updateNote});
        }

        
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

//Delete a note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try{
        const userId = await req.user.id;

        let note = await Note.findById(req.params.id);
        if(!note){
            res.status(404).send('Not Found');
        }else{
            if(note.user.toString() !== userId){
                res.status(404).send('Not Allowed');
            }else{
                const updateNote = await Note.findByIdAndDelete(req.params.id);
        
                res.status(200).json({success: "Note Deleted Successfully!", note: note});
            }
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
});

module.exports = router;