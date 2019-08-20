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
        case "spotify-this-song":
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

switchCase(userCommand, userQuery);

function concertThis(userQuery) {
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codecademy")
        .then(function (response) {
            var data = response.data;
            for (var i = 0 ; i < data.length ; i++) {
                var date = moment(data[i].datetime).format("MM/DD/YYYY");
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
            console.log("Error occured: " + error);
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
    if (!userQuery) {
        userQuery = "Mr Nobody";
        console.log("---------------------------------------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    } 
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&tomatoes=true&apikey=trilogy")
        .then(function(response) {
            var data = response.data;
            console.log("---------------------------------------------------");
            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[2].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("---------------------------------------------------");
        });
}
function doWhatItSays(){
    fs.readFile('random.txt', "utf8", function(error, data){
        if (error) { 
            console.log("Error occured: " + error);
        }
        var txt = data.toString().split(",");
        for (var i = 0 ; i < txt.length ; i += 2){
            switchCase(txt[i], txt[i+1]);
        }
    });
}