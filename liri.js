//set variables to access APIs
var Twitter = require("twitter");
var keys=require("./keys.js");
var Spotify = require('node-spotify-api');
var request=require("request");
var fs = require("fs");

//references API codes
var twitterClient = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);

search=process.argv.slice(3).join(" ");

var commands = {
	//returns tweets
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
	//returns information for song
	"spotify-this-song":function(){
		if (search){
			spotifyClient.search({ type: 'track', query: search }, function(error, data) {
	  			if (error) {
	    			return console.log('Error occurred: ' + error);
	  			}
	 			else {
	 				console.log("Song: "+data.tracks.items[0].name);
	 				console.log("Artist: "+data.tracks.items[0].artists[0].name);
	 				console.log("Album: "+data.tracks.items[0].album.name);
	 				console.log("Song URL: "+data.tracks.items[0].external_urls.spotify+"\n");
	 			}
			});
		}
		else {
			spotifyClient.search({ type: "track", query: "The Sign" }, function(error, data) {
	  			if (error) {
	    			return console.log('Error occurred: ' + error);
	  			}
	 			else {
	 				console.log("Song: "+data.tracks.items[4].name);
	 				console.log("Artist: "+data.tracks.items[4].artists[0].name);
	 				console.log("Album: "+data.tracks.items[4].album.name);
	 				console.log("Song URL: "+data.tracks.items[4].external_urls.spotify+"\n");
	 			}
			});
		}
	},
	//returns information for a movie
	"movie-this":function(){
		if (search){
			var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + search + "&y=&plot=short&r=json";
		}
		else {
			var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + "Mr. Nobody" + "&y=&plot=short&r=json";
		}
		request(queryUrl, function(error, response, body){
			if (error) {
	    		return console.log('Error occurred: ' + error);
	  		}
	  		else {
	  			console.log("Title: "+JSON.parse(body).Title);
	  			console.log("Year: "+JSON.parse(body).Year);
	  			console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
	  			console.log("Country: "+JSON.parse(body).Country);
	  			console.log("Language: "+JSON.parse(body).Language);
	  			console.log("Plot: "+JSON.parse(body).Plot);
	  			console.log("Actors: "+JSON.parse(body).Actors);
	  			console.log("Website: "+JSON.parse(body).Website);
	  		}
	  	});
	},
	//reads text in random.txt file and executes functions
	"do-what-it-says":function(){
		fs.readFile("random.txt", "utf8",function(error,data){
			if (error) {
				console.log(error);
			}
			var dataArray=data.split(",");
			search=dataArray[1];
			commands[dataArray[0]]();
		});
	}
}

//executes function based on user input in command line
commands[process.argv[2]]();