const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/seed.js');

const app = express();

const port = 3002;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/:restaurantId', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

//get the set of popular dishes
app.get('/:restaurantId/popularDish', (req, res) => {
  db.Dish.find({ restuarantID: req.params.restaurantId }).limit(10).exec((err, Dish) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(Dish);
    }
  });
});

//get single popular dish
// app.get('/:restaurantId/popularDish/:dishId')

//create one popular dish record to the database
// app.post('/:restaurantId/popularDish/:dishId', (req, res) => {
// });

//Update one review record in the database.
// app.put('/:restaurantId/popular/:dishId')

//Delete one review record from the database.
// app.delete('/:restaurantId/popular/:dishId')

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
