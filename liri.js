require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var searchConcertThis = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {

            if (!response.data.length) {
                console.log("No results found for your search");
                return;
            }

            console.log("Upcoming concerts:");

            for (var i = 0; i < response.data.length; i++) {
                var show = response.data[i];

                // Print data about each concert
                // If a concert doesn't have a region, display the country instead
                // Use moment to format the date
                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

var spotifyThisSong = function(songName) {
    if (songName === undefined) {
      songName = "The Sign";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songs = data.tracks.items;
  
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("artist(s): " + songs[i].artists.map(getArtistNames));
          console.log("song name: " + songs[i].name);
          console.log("preview song: " + songs[i].preview_url);
          console.log("album: " + songs[i].album.name);
          console.log("-----------------------------------");
        }
      }
    );
  };

