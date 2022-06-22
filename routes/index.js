const express = require('express');
const router = express.Router();
const mwAuth = require('../middleware/authentication');
const auth = require('../controllers/auth');
const fileMgmt = require('../shared/fileMgmt');




// L O G I N

router.post('/login', auth.login);

router.get('/logout', mwAuth, function (req, res, next){
  return res.clearCookie('access_token').status(200).send('Logged out successfuly.');
})



/* GET home page. */
router.get('/',  function(req, res, next) {
  res.send('This is home page. Please go to /signin. The routes are /business/home and /customers/home. To log out please /logout ');
});

router.get('/user', mwAuth, function(req, res, next) {
  try{
  console.log(req.cookies);
  res.send(req.user.customerDetails);
} catch (err){
  res.status(401).send('Unauthorized');
  console.log(err);
}
  
});



//AUTHENTICATION
router.get('/signin', function(req, res, next){
  const filePath = fileMgmt.getHtmlFilePath('login.html');
  res.sendFile(filePath);
});




module.exports = router;
