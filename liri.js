// var request=require("request");
var Twitter = require("twitter");
var keys=require("./keys.js");
var client = new Twitter(keys.twitterKeys);

var commands = {
	"my-tweets":function(){

		var params = {screen_name: "marpels12"};
		client.get("statuses/user_timeline", params, function(error, tweets, response) {
			if (!error) {
				console.log(error);
			}
			for (var i=0; i<tweets.length; i++){
				console.log(i+1+". "+tweets[i].text+"  (Created: "+tweets[i].created_at+")\n");
			}
		});
	}
}

commands["my-tweets"]();