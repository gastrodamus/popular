const faker = require('faker');
const fs = require('fs');
const path = require('path');
const Uuid = require('cassandra-driver').types.Uuid;
//generate random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// create restaurant data
// const createRestaurant = (restaurant_id, writeStream) => {
//   const restaurantName = `${faker.lorem.word()} ${faker.lorem.word()}\n`;
//   let restaurantData = [
//     restaurant_id,
//     restaurantName
//   ];
//   restaurantData = restaurantData.join(',');
//   return writeStream.write(restaurantData);
// };

// create popular dish data
const createDishes = (restaurantId, imageId, writeDishesStream) => {
  let dishesData = '';
  const restaurantName = `${faker.lorem.word()} ${faker.lorem.word()}`;
  for (let i = 0; i < 10; i += 1) {
    const dishName = `${faker.lorem.word()}`;
    const imageNum = (imageId + i * 10) === 0 ? 1 : imageId + i * 10;
    const dishImage = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageNum}.jpg`;
    const dishPrice = getRandomInt(10, 50);
    const photoCount = getRandomInt(5, 150);
    const reviewCount = getRandomInt(5, 150);
    const popularDishId = i + 1;
    let dishData = [
      restaurantId,
      popularDishId,
      restaurantName,
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
  }
  return writeDishesStream.write(dishesData);
};

function generateData() {
  // const writeStream = fs.createWriteStream(path.resolve(__dirname, '../csv/restaurants.csv'));
  const writeDishesStream = fs.createWriteStream(path.resolve(__dirname, '../csv/dishes.csv'));

  console.time('data generation time consuming');
  let i = 10000000;

  //drain
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 1) {
        console.timeEnd('data generation time consuming');
        const imageId = i % 100;
        // createRestaurant(i, writeStream);
        createDishes(i, imageId, writeDishesStream);
      } else {
        const imageId = i % 100;
        ok = createDishes(i, imageId, writeDishesStream);
        // ok = createRestaurant(i, writeStream);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeDishesStream.once('drain', write);
    }
  }
  write();
}
generateData();
