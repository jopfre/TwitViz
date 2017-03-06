var config = require('../secret/serverConfig.js').config;

var server = require('./server.js');
var restify = require('restify');

//Sraping Client - Scrapes twitter and then posts the tweets to the db through out rest api.
var client = restify.createJsonClient({
    url: 'http://localhost:3000/'
});

var Twit = require('twit/lib/twitter.js'); //https://github.com/ttezel/twit

var T = new Twit(config.twitter);

// filter the public stream by the latitude/longitude
var london = [ '-0.275645', '51.415578', '-0.019741', '51.591208' ];
var stream = T.stream('statuses/filter', { locations: london });

stream.on('tweet', function (tweet) {

  if (tweet.geo != null) {
    var tweetData = {};
    tweetData.type = "Feature";

    tweetData.geometry = {};
    tweetData.geometry.type = "Point";
    tweetData.geometry.coordinates = tweet.geo.coordinates.reverse();

    client.post('/tweet', tweetData, function (err, req, res, tweetData) {
      if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
      } else {
        console.log('Tweet data saved >>>>>>>');
        console.log(tweetData);
      }
    });
  }

}); //end stream.on('tweet')

// example of getting the tweets - may be useful someday
// client.get('/tweets', function (err, req, res, tweets) {
//   if (err) {
//       console.log("An error ocurred >>>>>>");
//       console.log(err);
//   } else {
//       console.log("Total tweets " + tweets.length);
//       console.log('All tweets >>>>>>>');
//       console.log(tweets);
//   }
// });