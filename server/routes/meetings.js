'use strict';

var controller = require('../controllers/classes');

function classRouter(app){
  app.route('/meetings/')
    .get(controller.getClasses)
    .post(controller.createClass);

  app.route('/meetings/:meetingId/')
    .patch(controller.update);
}

module.exports = classRouter;

