const express = require('express');
const csvController = require('../controllers/csvController');
const verifyJwt = require('../middlewares/jwtMiddleware'); // Assuming JWT is needed for access control
const router = express.Router();

router.get('/csv-data', verifyJwt, csvController.getCsvFile);

module.exports = router;
