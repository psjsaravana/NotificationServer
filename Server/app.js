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

// configure mongodb with model
mongoose.connect('mongodb://ssaravananmechengg@gmail.com:incorrect94@ds89.mLab.com:29017/notificationapp');
var tokenSchema = new mongoose.Schema({
    token: String
});
var tokenModel = mongoose.model('Tokens', tokenSchema);

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

//API for adding Device token into MongoDB
app.put('/addtoken', function(req, res) {
    var token = new tokenModel({ "token": req.body.token });
    tokenModel.find({ "token": req.body.token }).exec(function(err, result) {
        if (!err) {
            if (result.length != 0) {
                res.send({ "message": "Token already added" });
            } else {
                token.save(function(err) {
                    if (err) res.send(err);
                    res.send({ "message": "Token added successfully!" });
                })
            }
        } else {
            res.send({ "message": "Database error" });
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
 