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

//pulling in spotify npm and keys
var Spotify = require('node-spotify-api');

if (process.argv[2] === "spotify-this-song" && process.argv[3]) {
  var spotify = new Spotify(keys.spotify);

  //placing the GET call to the Spotify API
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
} else if (process.argv[2] === "spotify-this-song") {
  var spotify = new Spotify(keys.spotify);

  //placing the GET call to the Spotify API
  spotify.search({ type: 'track', query: "Ace of Base - The Sign", limit: 1 }, function (err, data) {
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


//=============================
//OMDB Portion of LIRI
//=============================
var request = require('request');

if (process.argv[2] === "movie-this" && process.argv[3]) {
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + process.argv[3], function (error, response, body) {
    //console.log(error);
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  });
} else if (process.argv[2] === "movie-this") {
  request('http://www.omdbapi.com/?apikey=trilogy&t="Mr. Nobody"', function (error, response, body) {
    //console.log(error);
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  });
}


//=============================
//"Do-What-It-Says" Portion of LIRI
//=============================
var fs = require("fs");

if (process.argv[2] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(error);
    } else {
      //console.log(data);
      var dataArr = data.split(",");
      // We will then re-display the content as an array for later use.
      console.log(dataArr);

      var spotify = new Spotify(keys.spotify);

      //placing the GET call to the Spotify API
      spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      });
    }
  });
}