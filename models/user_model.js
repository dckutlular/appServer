var mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }, // username kısmı tekil ve zorunlu
    email: { type: String, unique: false, required: true }, // name kısmı tekil olmayan fakat zorunlu
    api_id: Number, // age kısmı ise sadece number tipinde olmalı, zorunlu veya tekil değil.
  });
//buradaki Users mongo db'deki collection'ın adı.
  module.exports = mongoose.model('Users', Schema); 