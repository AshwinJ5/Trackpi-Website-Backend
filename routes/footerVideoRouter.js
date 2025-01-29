// routes/footerVideoRoutes.js
const express = require('express');
const multer = require('../middlewares/multer');
const footerVideoController = require('../controllers/footerVideoController');
const verifyJwt = require('../middlewares/jwtMiddleware')
const router = express.Router();

router.post(
    "/addfootervideo",verifyJwt,
    multer.fields([
      { name: "videofile1", maxCount: 1 },
      { name: "videofile2", maxCount: 1 },
      { name: "videofile3", maxCount: 1 },
      { name: "imagefile", maxCount: 1 },
    ]),
    footerVideoController.createFooterVideo
  );
// update
router.patch("/updatefooterdetails", multer.fields([
    { name: "videofile1", maxCount: 1 },
    { name: "videofile2", maxCount: 1 },
    { name: "videofile3", maxCount: 1 },
    { name: "imagefile", maxCount: 1 },
  ]), footerVideoController.updateFooterVideo);
module.exports = router;

// get all footer detail
router.get('/getfooterdetails', footerVideoController.getAllFooterData);
