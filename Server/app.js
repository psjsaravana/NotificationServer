var gcm = require('node-gcm');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
var app = express();
var port = process.env.PORT || 8001;

app.get('/sendnotification', function(req, res) {
    tokenModel.find({}).exec(function(err, result) {
        if (!err) {
            var registrationTokens = [];
            for (var i = 0; i < result.length; i++) {
                registrationTokens.push(result[i].token);
            }
            sender.send(message, { registrationTokens: registrationTokens }, function(err, response) {
                if (err) res.send(err);
                else res.send(response);
            });
        } else {
            res.send(err);
        };
    });
});


app.use('/', function(req, res) {
  res.send('Server is Active!!!!!!!!!!');
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

module.exports = app;
 