require('dotenv').load();
var express = require('express');
var app = express();
var path = require('path');
var Twit = require('twit');
var _ = require('lodash');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});

var T = new Twit( {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

/*  REST search - 
//Gets most recent 10 tweets from user which is stored in twitterHandle variable

var fetchTwitterData = function(req, res) {
  var twitterHandle = "danieltosh";
  T.get('statuses/screen_name', {screen_name:twitterHandle, count: 10},
    function(error, data, response) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].text + '\n');
      };
  });
};

fetchTwitterData(); */


var tweetStream = T.stream('statuses/sample');

// on tweet
tweetStream.on('tweet', function (tweet) {
  if(tweet.text.includes("bomb") )  {
    console.log('---');
    console.log('screen_name:', tweet.user.screen_name);
    console.log('text:', tweet.text);
  }
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function () {
  console.log("%c express server 🤓  listening on port " + server.address().port);
});
