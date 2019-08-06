// GET /api/popular/:restaurantId/
// GET /api/popular/:restaurantId/:popularDishId
// POST /api/popular/:restaurantId/
// PUT /api/popular/:restaurantId/:popularDishId
// DELETE /api/popular/:restaurantId/:popularDishId
const newrelic = require('newrelic');

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./pgsqlRouter.js');

const router = express.Router();
const app = express();
const port = 3002;

app.use(express.json());
app.use('/popular/:restaurantId', express.static(path.resolve(__dirname, '..', '..', 'client', 'dist')));
app.use('/api', router);

// get popular dishes of restaurant
router.get('/popularDish/:restaurantId/', controllers.cache, controllers.getRestaurantDishes);

// get a single popular dish of restaurant
// router.get('/popularDish/:restaurantId/:popularDishId', controllers.getPopularDish);

// add a single popular dish of restaurant to the dish list
router.post('/popularDish/:restaurantId', controllers.addPopularDish);

// router.patch('/:restaurantId/popularDish', controllers.patchPopularDish);
// router.delete('/:restaurantId/popularDish', controllers.deletePopularDish);
app.listen(port, () => console.log(`Server listening on port ${port}`));
