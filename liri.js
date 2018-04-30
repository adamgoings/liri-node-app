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
    count: 20
  };

  //placing the GET call to the twitter API
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Tweet: " + tweets[i].text + ", Date: " + tweets[i].created_at);
      }
    } else {
      console.log(error);
    }
  });
}

//=============================
//Spotify Portion of LIRI
//=============================
var Spotify = require('node-spotify-api');

if (process.argv[2] === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);


  spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
    } else {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    }
  });
}