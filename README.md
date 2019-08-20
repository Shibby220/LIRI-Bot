# LIRIBot

## Overview 

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data related to movies, songs, and concerts.

### Built With

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

     * Used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

### Deployment

1. Clone repo
2. Run `npm install`
3. Run one of the commands mentioned below

### Commands

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    
     * Name of the venue

     * Venue location

     * Date of the event formatted in "MM/DD/YYYY"

    ![concert-this](https://i.imgur.com/3rHEF75.png)

2. `node liri.js spotify-this-song <song name here>`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * Song name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

    ![spotify-this](https://i.imgur.com/k0MAhyV.png)

3. `node liri.js movie-this <movie name here>`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    ![movie-this](https://imgur.com/QRVYEuR.png)

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * This will run `spotify-this-song` for "I Want it That Way," as you can see is written in the file `random.txt`.

    ![do-what-it-says](https://imgur.com/S8INM6Y.png)