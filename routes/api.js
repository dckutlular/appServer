const express = require('express');
const router = express.Router();
const Users = require('../models/user_model.js');
const request = require('request');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    mongoose.connect('mongodb://test:test321@ds125525.mlab.com:25525/deniz', err => console.log(err ? err : 'Mongo connected.'));

    Users
        .find()
        .sort({ 'date': -1 })
        .limit(5)
        .exec(function (err, results) {
            if (err) throw err;
            res.send(results); //res.json(results); de oluyor.
        });

    //exec'in then li ve catchli kullanımı.
    // Users
    // .find()
    // .sort({ 'date': -1 })
    // .limit(5)
    // .exec()
    // .then(function (results) {
    //     res.send(results);
    // })//res.json(results); de oluyor.
    // .catch(err => {
    //     if (err) throw err;
    // });
});

router.post('/', function (req, res) {
    console.log('request infomm : ' + JSON.stringify(req.body));
    mongoose.connect('mongodb://test:test321@ds125525.mlab.com:25525/deniz', err => console.log(err ? err : 'Mongo connected.'));

    //check if it is exist on mongodb.
    Users
        // .find({ api_id: req.query.api_id })
        .find({ api_id: req.body.api_id })
        .exec(function (err, results) {
            if (err) throw err;

            //if exist
            if (results != "") {
                console.log('db de var. dbdeki değer: ', results);
                res.send(results); // res.json(results); da oluyor. çalışır.
            }

            //if doesn't exist: request to the api and log(save) it to mongodb
            else {
                console.log('db de yok.');
                console.log('result', results);

                const url = "https://jsonplaceholder.typicode.com/comments/" + req.body.api_id;
                //req to the api
                request.get(url, (error, response, body) => {
                    let data = JSON.parse(body);
                    console.log('body:  ' + body);

                    const obj = {
                        name: data.name,
                        email: data.email,
                        api_id: data.id,
                        date: Date.now()
                    };

                    const user = new Users(obj); // Yeni bir kullanıcı satırı oluşturalım.

                    user.save((err, doc) => { // Yeni oluşturduğumuz satırı işleyelim.
                        if (err) {
                            console.error(err)
                        } else {
                            console.log(doc)
                        }
                    });

                    res.send(body);

                });
            }
        });
});

module.exports = router;
