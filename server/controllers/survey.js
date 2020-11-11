let Survey = require('../models/survey');

module.exports.getSurveys = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        surveys: surveys
      });
    }
  });
};