var friends = require("../data/friends");
var path = require("path");

var totalDifference = 0;

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var usrData 	= req.body;
		var usrName 	= usrData.name;
		var usrImage 	= usrData.image;
		var usrScores 	= usrData.scores;
		
		//loop through the friends data array of objects to get each friends scores
		for ( var i = 0; i < friends.length; i++ ) {
			var totalDifference = 0;

			//loop through that friends score and the users score and calculate the 
			// absolute difference between the two and push that to the total difference variable set above
			for ( var j = 0; j < 10; j++ ){
				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
				// If the sum of differences is less then the differences of the current "best match"
			}

			if ( totalDifference <= greatMatch.matchDifference ) {
				// Reset the bestMatch to be the new friend. 
				greatMatch.name = friends[i].name;
				greatMatch.photo = friends[i].photo;
				greatMatch.matchDifference = totalDifference;
			}
		}
		
		friends.push(usrData);
 
		res.json(greatMatch); 
  });

};

