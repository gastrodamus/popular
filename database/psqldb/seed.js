const faker = require('faker');
const fs = require('fs');
const path = require('path');

//generate random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//generate left skewed random number
const randn_bm = (min, max, skew) => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
};

// create restaurant data
const createRestaurant = (writeStream) => {
  const restaurantName = `${faker.lorem.word()} ${faker.lorem.word()}\n`;
  let restaurantData = [
    restaurantName
  ];
  restaurantData = restaurantData.join(',');
  return writeStream.write(restaurantData);
};

// create popular dish data
const createDishes = (restaurantId, imageId, writeDishesStream, writeReviewStream, writeImageStream) => {
  let dishesData = '';
  for (let i = 1; i <= 10; i += 1) {
    const dishName = `${faker.lorem.word()}`;
    let imageNumDish = (imageId + i * 10) === 0 ? 1 : imageId + i * 10;
    if (imageNumDish > 1000) {
      imageNumDish = 1000;
    }
    const dishImage = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageNumDish}.jpg`;
    const dishPrice = getRandomInt(10, 50);
    const photoCount = getRandomInt(5, 150);
    const reviewCount = getRandomInt(5, 150);
    popularDishId = i;
    let dishData = [
      popularDishId,
      restaurantId,
      dishImage,
      dishName,
      dishPrice,
      photoCount,
      reviewCount
    ];
    dishData = dishData.join(',');
    dishesData += dishData;
    dishesData += '\n';

    // create review data for each of dishes
    // let reviewsData = '';
    // normalized = randn_bm(0, 1, 5);
    // randomCount = normalized * 100;
    // for (let j = 0; j < randomCount; j++) {
    //   let reviewData = [
    //     restaurantId,
    //     popularDishId
    //   ];
    //   reviewData = reviewData.join(',');
    //   reviewsData += reviewData;
    //   reviewsData += '\n';
    // }
    // writeReviewStream.write(reviewsData);

    // let imagesData = '';
    // for (let j = 0; j < randomCount; j++) {
    //   const imageNumPhoto = Math.random(1, 1000);
    //   const imageUrl = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageNumPhoto}.jpg`;
    //   let imageData = [
    //     restaurantId,
    //     imageUrl
    //   ];
    //   imageData = imageData.join(',');
    //   imagesData += imageData;
    //   imagesData += '\n';
    // }
    // writeImageStream.write(imagesData);

  }
  writeDishesStream.write(dishesData);
};

function generateData() {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../csv/restaurants.csv'));
  const writeDishesStream = fs.createWriteStream(path.resolve(__dirname, '../csv/dishes.csv'));
  const writeReviewStream = fs.createWriteStream(path.resolve(__dirname, '../csv/reviews.csv'));
  const writeImageStream = fs.createWriteStream(path.resolve(__dirname, '../csv/images.csv'));

  console.time('data generation time consuming');
  let i = 10000000;
  
  //drain
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        console.timeEnd('data generation time consuming');
        const imageId = i % 1000;
        createRestaurant(writeStream);
        createDishes(i, imageId, writeDishesStream, writeReviewStream, writeImageStream);
        i -= 1;
      } else {
        const imageId = i % 1000;
        createDishes(i, imageId, writeDishesStream, writeReviewStream, writeImageStream);
        ok = createRestaurant(writeStream);
        i -= 1;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
  write();
}
generateData();
