const faker = require('faker');
const fs = require('fs');
const path = require('path');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// create restaurant data
const createRestaurant = (restaurantId, writeStream) => {
  const restaurantName = `${faker.lorem.word()} ${faker.lorem.word()}\n`;
  let restaurantData = [
    restaurantName
  ];
  restaurantData = restaurantData.join(',');
  return writeStream.write(restaurantData);
};

// create popular dish data
const createDishes = (restaurantId, imageId, writeDishesStream, writeReviewStream) => {
  let dishesData = '';
  for (let i = 1; i <= 10; i += 1) {
    const dishName = `${faker.lorem.word()}`;
    const dishImage = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageId}.jpg`;
    const dishPrice = getRandomInt(10, 50);
    const photoCount = getRandomInt(5, 150);
    dishId = i;
    let dishData = [
      restaurantId,
      dishImage,
      dishName,
      dishPrice,
      photoCount
    ];
    dishData = dishData.join(',');
    dishesData += dishData;
    dishesData += '\n';

    // create review data for each of dishes
    let reviewsData = '';
    for (let j = 0; j < getRandomInt(5,20); j++) {
      let reviewData = [
        restaurantId,
        dishId
      ];
      reviewData = reviewData.join(',');
      reviewsData += reviewData;
      reviewsData += '\n';
    }
    writeReviewStream.write(reviewsData);
  }
  writeDishesStream.write(dishesData);
};

function generateData() {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../csv/restaurants.csv'));
  const writeDishesStream = fs.createWriteStream(path.resolve(__dirname, '../csv/dishes.csv'));
  const writeReviewStream = fs.createWriteStream(path.resolve(__dirname, '../csv/reviews.csv'));

  console.time('data generation time consuming');
  let i = 10000000;

  function write() {
    let ok = true;
    do {
      if (i === 1) {
        console.timeEnd('data generation time consuming');
        // last time!
        const imageId = i % 1000;
        createRestaurant(i, writeStream);
        createDishes(i, imageId, writeDishesStream, writeReviewStream);
        i -= 1;
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        const imageId = i % 1000;
        createDishes(i, imageId, writeDishesStream, writeReviewStream);
        ok = createRestaurant(i, writeStream);
        i -= 1;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writeStream.once('drain', write);
    }
  }
  write();
}
generateData();
