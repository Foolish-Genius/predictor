const express = require('express');
const router = express.Router();

const { getEligibleCourses } = require('../controllers/collegeControllers');


router.post('/eligible-courses', getEligibleCourses);

module.exports = router;
