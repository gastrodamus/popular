const { Pool } = require('pg');
const axios = require('axios');
const redis = require('redis');

const client = redis.createClient(6379);

client.on('error', (err) => {
  console.log("Error " + err)
});

//add database password
const pool = new Pool({
  user: 'minh',
  host: '3.16.37.237',
  database: 'postgres',
  password: 'password',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

function cache(req, res, next) {
  const restaurantId = req.params.restaurantId;
  client.get(restaurantId, function (err, data) {
      if (err) throw err;

      if (data != null) {
          res.send(data);
      } else {
          next();
      }
  });
}


const queryDb = async (q) => {
  try {
    const result = await pool.query(q);
    return result.rows;
  } catch (err) { 
    console.log(err.stack);
    return null;
  }
};

// GET /api/popular/:restaurantId/
// GET /api/popular/:restaurantId/:popularDishId
// POST /api/popular/:restaurantId/
// PUT /api/popular/:restaurantId/:popularDishId
// DELETE /api/popular/:restaurantId/:popularDishId


// GET /api/popularDish/:restaurantId
const getRestaurantDishes = async (req, res) => {
  // console.log(req.params)
  let restaurantId = req.params.restaurantId
  try {
    const data = await queryDb(`SELECT * FROM popular_dish WHERE restaurant_id=${req.params.restaurantId}`);
    client.setex(restaurantId, 3600, JSON.stringify(data));
    return res.status(200).send(data);
  } catch(e) {
      return res.status(400).send(e);
  }
}

// POST /api/popularDish/:restaurantId/
const addPopularDish = async (req, res) => {
  try {
    const text = `INSERT INTO 
                  popular_dish(popular_dish_id, restaurant_id, dish_image, dish_name, price_dish, photo_count, review_count)
                  VALUES (${req.body.popularDishId}, ${req.params.restaurantId}, '${req.body.dishImage}',
                         '${req.body.dishName}', ${req.body.dishPrice}, ${req.body.photoCount}, ${req.body.reviewCount})`;
    const data = await queryDb(text);
    return res.status(200).send('post success to restaurant id : ' + req.params.restaurantId);
  } catch(e) {
      console.error(e);
      return res.sendstatus(400).send(e);
  }
}

// UPDATE /api/popularDish/:restaurantId/
// const updatePopularDish = async (req, res) => {

// }

// DELETE /api/popularDish/:restaurantId/
// const deletePopularDish = async (req, res) => {

// }

module.exports = {
  getRestaurantDishes,
  addPopularDish,
  cache
};

