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

module.exports.getSurvey = (req, res, next) => {
  let id = req.params.id
  
  Survey.findById({_id: id}, (err, surveys) => {
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


module.exports.addSurveys = (req, res, next) => {
  
  let newSurvey = Survey({      
      "name":req.body.name,
      "dateCreated":req.body.dateCreated,
      "responses":req.body.responses,
      "questions":req.body.questions
  });  
  Survey.create((newSurvey, (err, Survey) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    else
    {
      res.json({
        error: err,
        surveys: surveys
      });
      
    }
  }
  ));
}

module.exports.updateSurveys = (req, res, next) => {
  let id = req.params.id
  let updateSurveys = Survey({
    "_id": id,
    "name": req.body.name,
    "dateCreated":req.body.dateCreated,
    "responses":req.body.responses,
    "questions":req.body.questions
  })

  Survey.updateOne({_id: id}, updateSurveys, (err, surveys) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else 
    {
      res.json({
        error: err,
        
        surveys: surveys
      });
    }
    });
}

module.exports.deleteSurveys = (req, res, next) => {
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
        error: err,
        surveys: surveys
      });
      }
    });
    }
 