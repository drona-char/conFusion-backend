const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Feedbacks = require('../models/feedback');

const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Feedbacks.find(req.query)
    .then((feedback) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(cors.corsWithOptions,(req, res, next) => {
    Feedbacks.create(req.body)
    .then((feedback) => {
        console.log('feedback submitted ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err)); 
  
  })

  .delete(authenticate.verifyUser,(req, res, next) => {
    Feedbacks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
  
  });

  module.exports = feedbackRouter;
