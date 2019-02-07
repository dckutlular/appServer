// const https = require("https");
// const url = "https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty";
// // const url = "https://jsonplaceholder.typicode.com/posts/1";
// https.get(url, res => {
//   res.setEncoding("utf8");
//   let body = "";
//   res.on("data", data => {
//     body += data;
//   });
//   res.on("end", () => {
//     body = JSON.parse(body);
//     console.log(body);
//   });
// });

var Users = require('./models/user_model.js');
var mongoose = require('mongoose');

const express = require("express");
var request = require('request');
const path = require("path");
var bodyParser = require('body-parser')
var app = express();
app.set('view engine', 'ejs');
app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
// const mongoose = require('mongoose');





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

app.get('/index', function (req, res) {
  mongoose.connect('mongodb://test:test321@ds125525.mlab.com:25525/deniz', err => console.log(err ? err : 'Mongo connected.'));
  Users.find({}, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.render('index', { txtDolu: "", data: "", oldSearches: results });

  });
});


app.post('/index', function (req, res) {

  console.log('request infomm : ' + JSON.stringify(req.body));
  const url = "https://jsonplaceholder.typicode.com/comments/" + req.body.txtId;
  var oldSearches = "";
  request.get(url, (error, response, body) => {
    let data = JSON.parse(body);
    console.log('body:  ' + body);

    mongoose.connect('mongodb://test:test321@ds125525.mlab.com:25525/deniz', err => console.log(err ? err : 'Mongo connected.'));

    const obj = {
      name: data.name,
      email: data.email,
      api_id: data.id
    };

    const user = new Users(obj); // Yeni bir kullanıcı satırı oluşturalım.

    user.save((err, doc) => { // Yeni oluşturduğumuz satırı işleyelim.
      if (err) {
        console.error(err)
      } else {
        console.log(doc)
      }
    });

    // res.json(json);
    res.render('index', { data: data, txtDolu: req.body.txtId, oldSearches: oldSearches });
    // res.sendFile(path.join(__dirname + '/index.html'));
  });
});