'use strict';

var _ = require('lodash');
var LdsOrgAdapter = require('../adapters/lds-org-adapter.js');
var Promise = require('bluebird');
var conf = require('../config/env/default.js');
var Member = require('../models').Member;
var ldsConf = conf.LdsOrgAdapter;

var ldsOrg = Promise.promisifyAll(new LdsOrgAdapter());


function parseMember(memberJson){
  var member = {};
  var house = memberJson;
  var hoh = house.headOfHouse;

  member.individualId      = hoh.individualId;
  member.givenName         = hoh.givenName;
  member.surName           = hoh.surname;
  member.preferredName     = hoh.preferredName;
  member.gender            = hoh.gender;
  member.email             = house.email || hoh.email;
  member.phone             = house.phone || hoh.phone;
  member.address1          = house.desc1;
  member.address2          = house.desc2;
  member.city              = house.city;
  member.state             = house.state;
  member.postal            = house.postalCode;
  member.lat               = house.latitude;
  member.long              = house.longitude;
  member.birthDate         = hoh.birthDate;
  member.dateMovedInUnit   = hoh.dateMovedIntoCurrentUnit;

  return member;
}


ldsOrg
  .loginAsync(ldsConf.username, ldsConf.password)
  .then(function(loggedIn){
    if(loggedIn){
      return ldsOrg.getCurrentUserAsync();
    }
  })
  .then( function(user) {
    return ldsOrg.getUnitMemberListAsync(user.homeUnitNbr);
  })
  .then( function(resp){
    _.forEach(resp.households, function(hh) {
      var member = parseMember(hh);
      Member
        .upsert(member, {logging: console.log,})
        .catch( function(err) {
          console.dir(err);
        });
    });
  }).then( function(members) { });

