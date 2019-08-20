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

var spotifyThisSong = function (songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artists: " + songs[i].artists.map(getArtistNames));
                console.log("Song Name: " + songs[i].name);
                console.log("Preview: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
            }
        }
    );
};

var movieThis = function (movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var url =
        "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(url).then(
        function (response) {

            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        }
    );
};