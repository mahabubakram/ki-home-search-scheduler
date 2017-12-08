var express = require('express');
var router = express.Router();
var scheduler = require('node-schedule');
var utils = require('../utils/utils.js');
var email = require('../utils/email.js');
var crawler = require('../utils/crawler.js');
var job = null;
var rule = new scheduler.RecurrenceRule();
rule.second = utils.convertToArray(5); // Defaults to every 5 second

/* starts the scheduler. */
router.get('/start', function(req, res, next) {
  if(job == null){
    job = scheduler.scheduleJob(rule, function(){
      crawler.collect();
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

/* Configure the scheduler to run every few second. */
router.get('/configure/seconds/:seconds', function(req, res, next) {
  var seconds = parseInt(req.params.seconds);
  if(seconds < 5){
    res.send("Crawler cannot run more frequently than 5 seconds");
  } else {
    rule = new scheduler.RecurrenceRule();
    rule.second = utils.convertToArray(seconds);
    if(job != null){
      job.cancel();
    }
    job = scheduler.scheduleJob(rule, function(){
      crawler.collect();
    });
    res.send(200);
  }
});

/* Configure the scheduler to run every few minute. */
router.get('/configure/minutes/:minute', function(req, res, next) {
  var minute = parseInt(req.params.minute);
  rule = new scheduler.RecurrenceRule();
  rule.minute = utils.convertToArray(minute);
  if(job != null){
    job.cancel();
  }
  job = scheduler.scheduleJob(rule, function(){
    crawler.collect();
  });
  res.send(200);
});

module.exports = router;
