// GET /api/popular/:restaurantId/
// GET /api/popular/:restaurantId/:popularDishId
// POST /api/popular/:restaurantId/
// PUT /api/popular/:restaurantId/:popularDishId
// DELETE /api/popular/:restaurantId/:popularDishId

const path = require('path');
const express = require('express');
const controllers = require('./pgsqlRouter.js');

const router = express.Router();
const app = express();
const port = 3002;

app.use('/:restaurantId', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use('/api', router);
app.use(express.json());

router.get('/popularDish/:restaurantId/', controllers.getRestaurantDishes);
// router.get('/:restaurantId/popularDish/:popularDishId', controllers.getPopularDish);

// router.post('/:restaurantId/popularDish', controllers.postPopularDish);

// router.patch('/:restaurantId/popularDish', controllers.patchPopularDish);

// router.delete('/:restaurantId/popularDish', controllers.deletePopularDish);

app.listen(port, () => console.log(`Server listening on port ${port}`));