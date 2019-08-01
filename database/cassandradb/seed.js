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
const createRestaurant = (restaurant_id, writeStream) => {
  const restaurantName = `${faker.lorem.word()} ${faker.lorem.word()}\n`;
  let restaurantData = [
    restaurant_id,
    restaurantName
  ];
  restaurantData = restaurantData.join(',');
  return writeStream.write(restaurantData);
};

// create popular dish data
const createDishes = (restaurantId, imageId, writeDishesStream) => {
  let dishesData = '';
  for (let i = 1; i <= 10; i += 1) {
    const dishName = `${faker.lorem.word()}`;
    const dishImage = `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${imageId}.jpg`;
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
  }
  writeDishesStream.write(dishesData);
};

function generateData() {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../csv/restaurants.csv'));
  const writeDishesStream = fs.createWriteStream(path.resolve(__dirname, '../csv/dishes.csv'));

  console.time('data generation time consuming');
  let i = 10000000;

  //drain
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        console.timeEnd('data generation time consuming');
        const imageId = i % 1000;
        const restaurantId = Uuid.random();
        createRestaurant(restaurantId, writeStream);
        createDishes(restaurantId, imageId, writeDishesStream);
        i -= 1;
      } else {
        const imageId = i % 1000;
        const restaurantId = Uuid.random();
        createDishes(restaurantId, imageId, writeDishesStream);
        ok = createRestaurant(restaurantId, writeStream);
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
