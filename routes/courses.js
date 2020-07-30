const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses')
// mergeParams for bootcampId merging
const router = express.Router({ mergeParams: true });

// model
const Course = require('../models/Course');

// middleware
const advancedResults = require('../middleware/advancedResults');
// protect middleware for to protect the particular routes for access without permission or loggedIn
const { protect, authorize } = require('../middleware/auth')

// calling specific routes
// for (/) without Id
router.route('/')
    .get(
        advancedResults(Course, {
            path: 'bootcamp',
            select: 'name description'
        }),
        getCourses
    )
    .post(protect, authorize('publisher', 'admin'), addCourse);

// for (/:id) with Id
router.route('/:id').get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

// exports
module.exports = router;
