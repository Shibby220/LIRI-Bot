require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");

var Spotify = ("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

function switchCase(userInput, userQuery) {
    switch (userInput){
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
            doWhatItSays();
            break;
        default:
            console.log("Please input a valid command")
    }
}

switchCase(userInput, userQuery);

function concertThis(userQuery) {
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codecademy")
        .then(function (response) {
            var data = response.data;
            for (i in data) {
                var date = moment(data[i].datetime).format("MMM DD, YYYY");
                console.log("What: " + data[i].venue.name)
                console.log("Where: " + data[i].venue.city + ", " + data[i].venue.country);
                console.log("When: " + date);
                console.log("\n---------------------------------------------------\n");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifyThis(){
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    spotify.search({type: 'track', query: userQuery, limit: 1}, function(error, data) {
        if (error) {
            return console.log("Error occured: " + error);
        }
        var spotifyArr = data.tracks.items;

        for (i = 0 ; i < spotifyArr.length; i++){
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Spotify link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
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
            var data = response.data;
            console.log('================ Movie Info ================');
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMdB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[2].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log('==================THE END=================');
    });
    }
}

function doWhatItSays(){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (err) { throw err };
        var txt = data.toString().split(",");
        spotifyThis(txt[1]);
    });
}