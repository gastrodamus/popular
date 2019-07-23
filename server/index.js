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

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));


app.get('/popular/:id', (req, res) => {
  db.Dish.find({ restuarantID: req.params.id }).limit(10).exec((err, Dish) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(Dish);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
