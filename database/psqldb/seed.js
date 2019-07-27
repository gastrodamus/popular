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
    restaurantId,
    restaurantName
  ];
  restaurantData = restaurantData.join(',');
  return writeStream.write(restaurantData);
};

// create popular dish data
const createDishes = (restaurantId, imageId, writeDishesStream, writeReviewStream) => {
  let dishesData = '';
  for (let i = 0; i < 10; i += 1) {
    const dishName = `${faker.lorem.word()}`;
    const dishImage = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageId}.jpg`;
    const dishPrice = getRandomInt(10, 50);
    const photoCount = getRandomInt(5, 150);
    const dishId = i + 1;
    let dishData = [
      dishId,
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
    for (let j = 0; j < getRandomInt(10,50); j++) {
      reviewId = j + 1;
      let reviewData = [
        reviewId,
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
  let i = 1000;

  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        console.timeEnd('data generation time consuming');
        // last time!
        const imageId = i % 1000;
        createRestaurant(i, writeStream);
        createDishes(i, imageId, writeDishesStream, writeReviewStream);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        const imageId = i % 1000;
        createDishes(i, imageId, writeDishesStream, writeReviewStream);
        ok = createRestaurant(i, writeStream);
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
