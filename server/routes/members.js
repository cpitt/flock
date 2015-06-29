'use strict';

var memberCtrl = require('../controllers/members');

function memberRouter(app){
  app.route('/members/')
    .get(memberCtrl.getMembers);

  app.route('/members/:memberId/')
    .get(memberCtrl.getMember);
}

module.exports = memberRouter;
