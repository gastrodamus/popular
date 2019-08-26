## Sigsa.io popular dish photo carousel backend architecture

## Popular dish service API reference

`GET /api/popularDish/:restaurantId`


**Input**: `restaurantID` identifies which restaurant to get popular dishes from
            `dishId` identifies which one of dishes to get single popular dish from 

**Output**: Upon module initialization, output will be JSON of all popular dished and specific information of each.
            Upon additional `popularDishId` query, output will be JSON of single popular dish and its specific information.

`GET /api/popularDish/:restaurantId`

```
{
  restaurantID: <Number>,
  restaurantName: <String>,
  popular: [{
    dishId: <Number>,
    dishName: <String>,
    price: <Number>,
    photoCount: <Number>,
    reviewCount: <Number>
    },
    ...
  ]
}
```


### Read (GET)

`GET /api/popularDish/:restaurantId`

Find popular dishes via various criteria. This method returns up to 10 results per request.

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |

#### Output

```
{
  restaurantID: <Number>,
  restaurantName: <String>,
  popular: [{
    restaurantId: <Number>,
    dishId: <Number>,
    popularDishId: <Number>,
    dishName: <String>,
    price: <Number>,
    photoCount: <Number>,
    reviewCount: <Number>
    },
    ...
  ]
}
```

### Read (GET)

`GET /api/popularDish/:restaurantId/:popularDishId`

Find one popular dish out of entire popular dishes of the restaurant.

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |
| `popularDishId`  | `integer`     | *Required.* dish identifier for the targeted popular dish.             |

#### Output

```
{           
  restaurantId: <Number>,
  dishId: <Number>,
  popularDishId: <Number>,
  dishName: <String>,
  price: <Number>,
  photoCount: <Number>,
  reviewCount: <Number>
}
```



### Database Schema
```
CREATE TABLE restaurant (
  restaurant_id    SERIAL PRIMARY KEY,
  restaurant_name  VARCHAR(80) NOT NULL CHECK (char_length(restaurant_name) < 80)
);

CREATE TABLE popular_dish (
  dish_id         SERIAL PRIMARY KEY,
  popular_dish_id INTEGER,
  restaurant_id   INTEGER,
  dish_image      TEXT,
  dish_name       VARCHAR(80) NOT NULL CHECK (char_length(dish_name) < 80),
  price_dish      INTEGER,
  photo_count     INTEGER,
  review_count    INTEGER
);
```
