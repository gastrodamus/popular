const db = require('./index.js');
const faker = require('faker');
const mongoose = require('mongoose');

const popularDish = new mongoose.Schema({
  name: String,
  price: Number,
  revCount: Number,
  phoCount: Number,
  image: String,
  restuarantID: Number,
});

const Dish = mongoose.model('Dish', popularDish);

const seed = function seedData() {
  const ranNum = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  for (let i = 0; i < 100; i += 1) {
    const names = faker.lorem.word;
    const image1 = `https://popularlist.s3-us-west-1.amazonaws.com/munch${ranNum(100)}.jpg`;

    const popDish = new Dish({
      name: names(),
      price: ranNum(35),
      revCount: ranNum(30),
      phoCount: ranNum(200),
      image: image1,
      restuarantID: `${i}`,
    });
    popDish.save(function (err){
      if (err) return console.error(err);
    });
  }
  console.log('seeding success');
};
seed();
seed();
seed();
seed();
seed();
seed();
seed();
seed();
seed();
seed();
module.exports.Dish = Dish;
