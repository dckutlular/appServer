var Twitter = require('twitter');

function GetLastTweetsOfUser(username, count) {
    var results;
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { screen_name: username, count: count };
    client.get('statuses/user_timeline', params,
     function (error, tweets, response) {
        console.log(error ? error : tweets);
        results=tweets;
    });
    return results;
};
module.exports = {
    GetLastTweetsOfUser : GetLastTweetsOfUser
}