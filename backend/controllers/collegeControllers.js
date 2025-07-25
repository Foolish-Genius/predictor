const fs = require('fs');
const path = require('path');

const getEligibleCourses = (req, res) => {
  const score = req.body.score;


  if (typeof score !== 'number' || score < 0 || score > 390) {
    return res.status(400).json({ error: 'Invalid score. Must be a number between 0 and 390.' });
  }

  try {

    const filePath = path.join(__dirname, '../data/bitsatCutoffs.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const courses = JSON.parse(data);


    const eligible = courses.filter(course => score >= course.cutoff);


    res.json(eligible);

  } catch (error) {

    res.status(500).json({ error: 'Failed to read cutoff data.' });
  }
};

module.exports = { getEligibleCourses };
