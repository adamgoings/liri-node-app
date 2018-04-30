require("dotenv").config();
var keys = require("./keys.js");
//=============================
//Twitter Portion of LIRI
//=============================
if (process.argv[2] === "my-tweets") {
  //pulling in twitter npm and keys from keys.js
  var Twitter = require("twitter");

  var client = new Twitter(keys.twitter);

  //entering params for our GET call
  var params = {
    screen_name: 'goonsncsu',
    count: 1
  };

  //placing the GET call to the twitter API
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(JSON.stringify(tweets[0].created_at));
    } else {
      console.log(error);
    }
  });
}
//need to be able to pull out the tweet text as well as the created at date...currently struggling here.

//=============================
//Spotfiy Portion of LIRI
//=============================
var Spotify = require('node-spotify-api');

if (process.argv[2] === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);


  spotify.search({ type: 'track', query: process.argv[3] , limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(JSON.stringify(data));
  });
// } else {
//   spotify.search({ type: 'track', query: "The Sign"}, function (err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
//     console.log(JSON.stringify(data));
//   });
}
