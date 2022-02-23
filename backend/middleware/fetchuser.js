const jwt = require('jsonwebtoken');

const JWT_SECRET = "This$@Azc@O0Kyc#!";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({ error: "Please try with valid access token!"});
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({ error: "Please try with valid access token!"});
    }
    
}

module.exports = fetchuser;