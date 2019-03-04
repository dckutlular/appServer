const request = require('request');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// function GetLastTweetsOfUser(username, count, callback) {
//     var params = { screen_name: username, count: count };
//     client.get('statuses/user_timeline', params, function (error, tweets, response) {
//         console.log(error ? error : tweets);
//         if (typeof callback === "function") {
//             callback(tweets);
//         }
//     });
// };

//bu şekilde çağırırsan kitli hesapların twitlerini çekemezsin. 
//twitter metoduyla çekebilmemin sebebi : twitterdaki app ile matthewsback'i eşleştirmesi.
function GetLastTweetsOfUser(username, count, callback) {
    var options = {
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        // headers: { 'User-Agent': 'request' },
        method: "GET",
        oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        },
        qs: {
            screen_name: username,
            count: count
        }
    };
    request(options, function (error, response, body) {
        console.log(error ? error : body);
        callback(JSON.parse(body));
    })
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
function TweetAt(status, callback) {
    var params = { status: status };
    client.post('statuses/update', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        callback(tweets);
    });
};

function Search(query, callback) {
    var params = { q: query, result_type: 'recent' };
    client.get('search/tweets', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        callback(tweets);
    });
};

function ShowUser(username, callback) {
    var params = { screen_name: username };
    client.get('users/show', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        callback(tweets);
    });
};

function GetFollowers(username, callback) {
    var params = { screen_name: username };
    client.get('followers/list', params, function (error, tweets, response) {
        console.log(error ? error : tweets);
        console.log('tweetsler burada', tweets);
        callback(tweets);
    });
};

function GetFollowersByName(username, count, callback) {
    var params = { screen_name: username, count: count };
    client.get('followers/list', params, function (error, followers, response) {
        callback(error ? followers : followers.users.map(element => element.name))
        ////map'in es6'sız kullanımı.
        // var followersArr = followers.users.map(function (element) {
        //    return element.name
        // });
    });
};

module.exports = {
    GetLastTweetsOfUser: GetLastTweetsOfUser,
    GetHomeTimeline: GetHomeTimeline,
    TweetAt: TweetAt,
    Search: Search,
    ShowUser: ShowUser,
    GetFollowers: GetFollowers,
    GetFollowersByName: GetFollowersByName
}