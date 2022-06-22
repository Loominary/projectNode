const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const fileMgmt = require('../shared/fileMgmt');


router.get("/home", function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath("customers-home.html");
    res.sendFile(filePath);
  });

router.post   ("/", cm.addNewCustomer);




  module.exports = router;