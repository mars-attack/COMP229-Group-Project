/* GET home page. */
let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');

// GET List of surveys
router.get('/', surveyController.getSurveys);

// TODOS:

//* GET survey by id
router.get('/:id', surveyController.getSurvey);

//* POST add survey
router.post('/add',surveyController.addSurveys);

//* POST update survey by id 
router.post('/update/:id', surveyController.updateSurveys);

//* POST delete survey by id
router.post('/delete/:id', surveyController.deleteSurveys);


module.exports = router;