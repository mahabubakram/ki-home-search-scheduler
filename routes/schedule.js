var express = require('express');
var router = express.Router();
var scheduler = require('node-schedule');
var utils = require('../utils/utils.js');
var email = require('../utils/email.js');
var job = null;
var rule = new scheduler.RecurrenceRule();
rule.second = utils.convertToArray(1); // Defaults to every second

/* starts the scheduler. */
router.get('/start', function(req, res, next) {
  if(job == null){
    job = scheduler.scheduleJob(rule, function(){
      console.log('The answer to life, the universe, and everything!');
    });
    res.send('Scheduler started');
  } else {
    res.send('Job already started');
  }
});

/* stops the scheduler. */
router.get('/stop', function(req, res, next) {
  if(job != null){
    job.cancel();
    job = null;
    res.send('Scheduler stopped');
  } else {
    res.send('No job scheduled');
  }
});

/* Configure the scheduler to run every second. */
router.get('/configure/seconds/:seconds', function(req, res, next) {
  var seconds = parseInt(req.params.seconds);
  rule = new scheduler.RecurrenceRule();
  rule.second = utils.convertToArray(seconds);
  if(job != null){
    job.cancel();
  }
  job = scheduler.scheduleJob(rule, function(){
    console.log('Job rescheduled to run every '+seconds+' seconds');
  });
  res.send('Scheduler started to run every '+seconds+' seconds');
});

/* Configure the scheduler to run every minute. */
router.get('/configure/minutes/:minute', function(req, res, next) {
  var minute = parseInt(req.params.minute);
  rule = new scheduler.RecurrenceRule();
  rule.minute = utils.convertToArray(minute);
  if(job != null){
    job.cancel();
  }
  job = scheduler.scheduleJob(rule, function(){
    console.log('Job rescheduled to run every '+minute+' minute');
  });
  res.send('Scheduler started to run every '+minute+' minute');
});

/* Send out test email */
router.get('/sendEmail', function(req, res, next) {
  email.sendEmail('yo');
  res.send('Send email');
});

module.exports = router;
