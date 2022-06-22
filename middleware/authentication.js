const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const bodyParser = require('body-parser');




module.exports= (req, res, next) => {
  
        try{
  
        req.user = jwt.verify(req.cookies.access_token, config.JWT_SECRET);
        
 
        next();
        } catch(err){
          console.log(err);
          res.status(401).send('Unauthorized.');
        }
      
}