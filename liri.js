// var request=require("request");
var Twitter = require("twitter");
var keys=require("./keys.js");
var Spotify = require('node-spotify-api');

var twitterClient = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);

var userInput=

var commands = {
	"my-tweets":function(){

		var params = {screen_name: "marpels12"};
		twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
			if (error) {
				console.log(error);
			}
			else {
				for (var i=0; i<tweets.length; i++){
					console.log(i+1+". "+tweets[i].text+"  (Created: "+tweets[i].created_at+")\n");
				}
			}
		});
	},
	"spotify-this-song":function(){
		spotifyClient.search({ type: 'track', query: process.argv[3] }, function(error, data) {
  			if (error) {
    			return console.log('Error occurred: ' + error);
  			}
 			else {
 				// console.log(data.tracks.items[0]);
 				console.log("Song: "+data.tracks.items[0].name);
 				console.log("Artist: "+data.tracks.items[0].artists[0].name);
 				console.log("Album: "+data.tracks.items[0].album.name);
 				console.log("Song URL: "+data.tracks.items[0].external_urls.spotify+"\n");
 			}
		});
	}
}

commands[process.argv[2]]();