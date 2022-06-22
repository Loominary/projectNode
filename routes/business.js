const express = require("express");
const router = express.Router();
const bm = require("../controllers/business");
const fileMgmt = require('../shared/fileMgmt');

router.get('/home', function (req, res, next){
  const filePath = fileMgmt.getHtmlFilePath('business-cards.html');
  res.sendFile(filePath);
})

router.post   ('/', bm.addBusinessCard);
router.get    ('/card', bm.getBusinessCardDetails);
router.get    ('/all-cards', bm.getCardsByCustomerId);
router.put    ('/:id', bm.updateBusinessCard);
router.delete ('/:id', bm.deleteBusinessCard) ;



module.exports = router;