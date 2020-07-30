const express = require('express');
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, bootcampPhotoUpload } = require('../controllers/bootcamps')
const router = express.Router();

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// models
const Bootcamp = require('../models/Bootcamp');

// middleware
// for filtering,sorting and pagination for allbootcamps,allcourse etc..,
const advancedResults = require('../middleware/advancedResults');
// protect middleware for to protect the particular routes for access without permission or loggedIn
const { protect, authorize } = require('../middleware/auth')

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);


// calling specific routes
// for (/) without Id
router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);
// for (/:id) with Id
router.route('/:id').get(getBootcamp).put(protect, authorize('publisher', 'admin'), updateBootcamp).delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

// for photo
router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

// exports
module.exports = router;