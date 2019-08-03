const { Pool } = require('pg');
const axios = require('axios');


const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'restaurant_popular_dishes',
  password: 'password',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

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
  try {
    const data = await queryDb(`SELECT * FROM popular_dish WHERE restaurant_id=${req.params.restaurantId}`);
    return res.status(200).send(data);
  } catch(e) {
      console.error(e);
      return res.status(400).send(e);
  }
}

// GET /api/popularDish/:restaurantId/:dishId
const getPopularDish = async (req, res) => {
  try {
    const data = await queryDb(`SELECT * FROM popular_dish WHERE restaurant_id=${req.params.restaurantId} AND popular_dish_id=${req.params.popularDishId}`)
    return res.status(200).send(data);
  } catch(e) {
      console.error(e);
      return res.status(400).send(e);
  }
}

// POST /api/popularDish/:restaurantId/
const addPopularDish = async (req, res) => {
  try {
    const text = `INSERT INTO 
                  popular_dish(popular_dish_id, restaurant_id, dish_image, dish_name, price_dish, photo_count, review_count)
                  VALUES (${req.body.popularDishId}, ${req.body.resId}, '${req.body.dishImage}',
                         '${req.body.dishName}', ${req.body.dishPrice}, ${req.body.photoCount}, ${req.body.reviewCount})`;
    const data = await queryDb(text);
    return res.status(200).send('post success');
  } catch(e) {
      console.error(e);
      return res.status(400).send(e);
  }
}

// UPDATE /api/popularDish/:restaurantId/
const updatePopularDish = async (req, res) => {

}

// DELETE /api/popularDish/:restaurantId/
const deletePopularDish = async (req, res) => {

}

module.exports = {
  getRestaurantDishes,
  getPopularDish,
  addPopularDish
};

// app.get('/all_users', async (req, res) => {
//   try {
//     const users = await queries.getAllUsers();
//     console.log(users);
//   } catch(e) {
//     // handle errors
//   }
// });
