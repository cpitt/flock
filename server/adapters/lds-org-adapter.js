'use strict';

var _ = require('lodash');
var request = require('request');

/**
 * An adapter that allows you to log into lds.org and interact with it's apis
 * @constructor
 */
function LdsOrgAdapter(){
  var self = this;
  var cookieJar = request.jar();

  this.loggedIn = false;
  this.request = request.defaults({jar: cookieJar, json: true});
}

/**
 * Log into a lds.org account
 * @param {String} username a valid lds.org username
 * @param {String} password password for the account
 */
LdsOrgAdapter.prototype.login = function(username, password, callback){
  var self = this;
  if(!username || !password){
    throw new Error('LdsOrgAdapter.login username and password required');
  }

  var authUrl = 'https://signin.lds.org/login.html';

  return this.request
    .post({ url: authUrl, form: { username: username, password: password } },
          function(err, resp, body){
            if(err){
              throw err;
            }
            self.loggedIn = true;
            return callback(null, true);
          });
};

/**
 * Get a url using logged in user
 * @param {String} url url to get
 */
LdsOrgAdapter.prototype.get = function(url, callback) {
  return this.request.get(url, function(err, resp, body){
    return callback(err, body);
  });
};

LdsOrgAdapter.prototype.getCurrentUser = function(callback) {
  return this.get('https://www.lds.org/mobiledirectory/services/v2.7/ldstools/current-user-detail', callback);
};

LdsOrgAdapter.prototype.getUnit = function(unitcallback){
  return this.get('https://www.lds.org/directory/services/ludrs/unit/current-user-ward-stake/');
};

LdsOrgAdapter.prototype.getUnitMemberList = function(unitId, callback) {
  return this.get('https://www.lds.org/mobiledirectory/services/v2.7/ldstools/member-detaillist-with-callings/' + unitId, callback);
};

LdsOrgAdapter.prototype.getMember = function(memberId, callback){
  return this.get('https://www.lds.org/directory/services/ludrs/mem/householdProfile/' + memberId);
};

LdsOrgAdapter.prototype.getIndividualPhotos = function(ids, callback){
  if(_.isString(ids)){ ids = [ids]; }
  var idString = ids.join(',');
  return this.get('https://www.lds.org/directory/services/ludrs/photo/url/' + idString + '/individual');
};

module.exports = LdsOrgAdapter;
