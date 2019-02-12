const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
var app = express();

//middleware. bunu yazmazsan index.html'e gidemez. Cannot GET /index.html hatası verir.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/index', function (req, res) {
//   const url = "https://jsonplaceholder.typicode.com/posts/1";
//   request.get(url, (error, response, body) => {
//     let json = JSON.parse(body);
//     console.log('body:  ' + body);
//     // res.json(json);
//     res.render('index',{data:json});
//     // res.sendFile(path.join(__dirname + '/index.html'));
//   });
// });


//sakla(tüm dataları çekmek için)
// app.get('/index', function (req, res) {
//   mongoose.connect('mongodb://test:test321@ds125525.mlab.com:25525/deniz', err => console.log(err ? err : 'Mongo connected.'));
//   Users.find({}, function (err, results) {
//     if (err) throw err;
//     console.log(results);
//     res.render('index', { txtDolu: "", data: "", oldSearches: results });
//   });
// });

app.use('/api', require('./routes/api'));

app.listen(8080);
