var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function GetLastTweetsOfUser(username, count, callback) {
    var params = { screen_name: username, count: count };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        if(typeof callback ==="function"){
            callback(tweets);
        }
    });
};

function GetHomeTimeline(count, callback) {
    var params = { count: count };
    client.get('statuses/home_timeline', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        callback(tweets);
    });
};

//statuses/update
//status:tweet
//in reply to status id : hangi id ' li twite reply atıyosun.
//auto populate reply metadata : reply'ın başındaki mention ı kaldırsın mı ?
function TweetAt(status, in_reply_to_status_id,auto_populate_reply_metadata, callback) {
    var params = { status: status ,in_reply_to_status_id:in_reply_to_status_id,auto_populate_reply_metadata:auto_populate_reply_metadata};
    client.post('statuses/update', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        callback(tweets);
    });
};

module.exports = {
    GetLastTweetsOfUser: GetLastTweetsOfUser,
    GetHomeTimeline : GetHomeTimeline,
    TweetAt : TweetAt
}