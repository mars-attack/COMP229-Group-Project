let Survey = require('../models/survey');
let userModel = require("../models/user");
let User = userModel.User; // alias
let passport = require("passport");

module.exports.getSurveys = (req, res, next) => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      let surveysToReturn = [];
      const promises = [];

      // updating returned surveys to include displayName of user
      surveys.forEach((survey, i) => {
        if (!survey.user) {
          return;
        }
        // handle asynchronous function
        const promise = User.findById({"_id": survey.user}, (err, foundUser) => {
          if (err) {
            console.error(err);
          } else {
            const surveyToReturn = {
              ...survey._doc,
              displayName:  foundUser.displayName
            }
            surveysToReturn.push(surveyToReturn);
          }
         }).exec();

         promises.push(promise);
      })

      Promise.all(promises).then(() => {
        
        //find display name here
        res.json({
          error: err,
          data: surveysToReturn
        });
      })

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
      "user":req.body.user,
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
  // the req body has two objects: survey and user
  let id = req.params.id
  let userID = req.body.userID
  let survey = Survey({
    "_id": id,
    "user": req.body.survey.user,
    "name": req.body.survey.name,
    "dateCreated":req.body.survey.dateCreated,
    "dateActive":req.body.survey.dateActive,
    "dateExpire":req.body.survey.dateExpire,
    "responses":req.body.survey.responses,
    "questions":req.body.survey.questions
  })

  console.log(survey.user);
  console.log(userID);
  
  //prevent users from updating if survey is not theirs
  if (survey.user === userID)
  {
    Survey.updateOne({_id: id}, survey, (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else 
      {
        res.json({error: err});
      }
    });
  }
  else
  {
    res.json({error: 'Failed to update messgage'});
  }
}

module.exports.takeSurvey = (req, res, next) => {
  let id = req.params.id
  let updatedRespones = req.body.responses;
  let updatedQuestions =  req.body.questions;

  Survey.findById({"_id": id},
   (err, survey) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else 
      {
        console.log(survey);
        // update response count
        survey.responses = updatedRespones;  
        // update options count
        survey.questions.forEach((question, i) => {
          question.options.forEach((option, j) => {
            option.count = updatedQuestions[i].options[j].count;
          });
        });
        survey.save();
        
        res.json({
          error: err        
        });
      }
  })
}

module.exports.deleteSurvey = (req, res, next) => {
  let id = req.body.survey._id
  let userID = req.body.userID;
  let surveyUser = req.body.survey.user;
  
  if (surveyUser === userID)
  {
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
  } else
  {
    res.json({error: 'Failed to delete survey'});
  }

}
 