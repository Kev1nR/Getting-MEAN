var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var othersController = require('../controllers/others');

/* Locations pages. */
router.get('/', locationsController.homeList);
router.get('/location', locationsController.locationInfo);
router.get('/location/review/new', locationsController.addReview);

/* Other pages */
router.get('/about', othersController.about);


module.exports = router;
