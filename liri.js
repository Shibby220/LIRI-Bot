require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

function switchCase(userCommand, userQuery) {
    switch (userCommand){
        case "concert-this":
            concertThis(userQuery);
            break;
        case "spotify-this":
            spotifyThis(userQuery);
            break;
        case "movie-this":
            movieThis(userQuery);
            break;
        case "do-what-it-says":
            doWhatItSays(userQuery);
            break;
        default:
            console.log("Please input a valid command")
    }
}

switchCase(userCommand, userQuery);

function concertThis(userQuery) {
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codecademy")
        .then(function (response) {
            var data = response.data;
            for (var i = 0 ; i < data.length ; i++) {
                var date = moment(data[i].datetime).format("MMM DD, YYYY");
                console.log("---------------------------------------------------");
                console.log("Venue: " + data[i].venue.name)
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                console.log("Date: " + date);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThis(userQuery){
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    spotify.search({type: 'track', query: userQuery, limit: 1}, function(error, data) {
        if (error) {
            return console.log("Error occured: " + error);
        }
        var spotifyArr = data.tracks.items;

        for (var i = 0 ; i < spotifyArr.length; i++){
            console.log("---------------------------------------------------");
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("---------------------------------------------------");
        };
    });   
}

function movieThis(userQuery) {
    var movieName = userQuery;
    if (!movieName) {
        console.log("---------------------------------------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        console.log("---------------------------------------------------");
    } else {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            console.log("---------------------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("---------------------------------------------------");
        });
    }
}

function doWhatItSays(userQuery){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (error) { throw error };
        var random = data.toString().split(",");
        spotifyThis(random[1]);
    });
}