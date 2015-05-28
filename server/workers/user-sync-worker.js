'use strict';

var request = require('request');
var cookieJar = request.jar();

var authUrl = 'https://signin.lds.org/login.html';

request.post({ url: authUrl,
               jar: cookieJar,
               form: {
                 username: '',
                 password: ''
               }
             }, function(err, resp, body){
               request.get({url: 'https://www.lds.org/directory/services/ludrs/mem/member-list/24503', jar: cookieJar},
                           function(err, resp, body){
                             console.log(body);
                           });
             });
