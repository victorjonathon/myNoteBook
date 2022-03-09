const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const { body, validationResult } = require('express-validator');

//Contact us email to admin: POST "/api/common/contact". No login required.
router.post('/contact', [
    body('email', 'Please enter a valid email.').isEmail(),
    body('message', 'Message must have minimum 5 letters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    const success = false;
    const message = "";

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { full_name, email, message } = req.body;

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'tyrese.littel67@ethereal.email', // generated ethereal user
                pass: 'vBF4AJR7VFpJrNDCHr', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"MyNoteBook" <info@mynotebook.com>',
            to: "admin@mynotebook.com", // list of receivers
            subject: "Contact email",
            text: "Hey this is email from nodemailer.", 
            html: `Hey Admin, Someone wanted to contact you. Here are the details<br/>
                <b>Full Name: </b> ${full_name}<br/>
                <b>Email: </b> ${email}<br/>
                <b>Message: </b> ${message}<br/>`,
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ success: true, message:'Email sent successfully.' });

    } catch (error) {
        //console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;