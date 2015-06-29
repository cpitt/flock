'use strict';

var Member = require('../models').Member;
//var syncWorker = require('../workers/sync-members');
var exported = {};

exported.getMembers = getMembers;
function getMembers(req, res, next){
  Member
    .findAll()
    .then( function(members) {
      return res.json(members);
    })
    .catch( function(err) {
    });
}

exported.getMember = getMember;
function getMember(req, res, next) {
  Member
    .findOne({where: {individual_id: req.params.memberId}})
    .then( function(member) {
      if(!member){
        var err = new Error('Failed to find member');
        err.status = 404;
        return next(err);
      }
      return res.json(member);
    })
    .catch( function(err) {
      res.send(400);
    });
}

function syncMembers(req, res) {

}

module.exports = exported;
