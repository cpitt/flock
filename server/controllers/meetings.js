'use strict';

var Meeting = require('../models').Meeting;

var exported = {};

exported.getMeetings = getMeetings;
function getMeetings(req, res, next) {
  Meeting
    .findAll()
    .then( function(classes) {
      res.json(classes);
    });
}

exported.createMeeting = createMeeting;
function createMeeting(req, res, next) {
  Meeting
    .create(req.body)
    .then( function(newMeeting) {
      return res.json(newMeeting);
    });
}

exported.update = update;
function update(req, res, next) {
  Meeting
    .findById(req.params.classId)
    .then( function(meeting) {
      if(!meeting){
        return next(new Error('not found'));
      }
      return meeting.update(req.body);
    })
    .then( function(meeting) {
      return res.json(meeting);
    })
    .catch( function(err) {
      return next(err);
    });
}

module.exports = exported;
