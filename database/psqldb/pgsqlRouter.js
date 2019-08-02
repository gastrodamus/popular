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

const getRestaurantDishes = async (req, res) => {
  const data = await queryDb(`SELECT * FROM popular_dish WHERE restaurant_id=${req.params.restaurantId}`);
  return (data ? res.send(data) : res.sendStatus(404));
}



module.exports = {
  getRestaurantDishes,
};

// app.get('/all_users', async (req, res) => {
//   try {
//     const users = await queries.getAllUsers();
//     console.log(users);
//   } catch(e) {
//     // handle errors
//   }
// });