var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.json(
    [
    {
      _id: 1,
      name: "Survey 1",
      dateCreated: "01/01/20",
      responses: 7,
      questions: [{
        title: "Q1: T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "Q2: T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "Q3: T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }]
    },
    {
      _id: 2,
      name: "Survey 2",
      dateCreated: "01/01/20",
      responses: 10,
      questions: [{
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }]
    },
    {
      _id: 3,
      name: "Survey 3",
      dateCreated: "01/01/20",
      responses: 10,
      questions: [{
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }, {
        title: "T/F the room is hot",
        options: [{
          details: "True",
          count: 4
        },{
          details: "False",
          count: 3
        }]
      }]
    }
  ]);
});

module.exports = router;
