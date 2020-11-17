let Survey = require('../models/survey');

module.exports.getSurveys = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: surveys
      });
    }
  }).sort({_id: -1});
};

module.exports.getSurvey = (req, res, next) => {
  let id = req.params.id
  
  Survey.findById({_id: id}, (err, foundSurvey) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: foundSurvey
      });
    }
  });
};


module.exports.addSurvey = (req, res, next) => {
  let newSurvey = Survey({      
      "name":req.body.name,
      "dateCreated":req.body.dateCreated,
      "dateActive":req.body.dateActive,
      "dateExpire":req.body.dateExpire,
      "responses":req.body.responses,
      "questions":req.body.questions
  });  

  Survey.create(newSurvey, (err, survey) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    else
    {
      res.json({
        error: err,
        data: survey
      });      
    }
  });
}

module.exports.updateSurvey = (req, res, next) => {
  let id = req.params.id
  let survey = Survey({
    "_id": id,
    "name": req.body.name,
    "dateCreated":req.body.dateCreated,
    "dateActive":req.body.dateActive,
    "dateExpire":req.body.dateExpire,
    "responses":req.body.responses,
    "questions":req.body.questions
  })

  Survey.updateOne({_id: id}, survey, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else 
    {
      res.json({
        error: err        
      });
    }
    });
}

module.exports.deleteSurvey = (req, res, next) => {
  let id = req.params.id;

  Survey.remove({_id: id}, (err)=> {
    if (err) 
    {
      console.error(err);
      res.end(err);
    } 
    else
     {
      res.json({
        error: err
      });
      }
    });
    }
 