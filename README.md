

# Popular dish service API reference

What are your service's inputs and outputs (API Spec)?

`GET /:restaurantId/popularDish`


**Input**: `restaurantID` identifies which restaurant to get popular dishes from
            `dishId` identifies which one of dishes to get single popular dish from 

**Output**: Upon module initialization, output will be JSON of all popular dished and specific information of each.
            Upon additional `dishId` query, output will be JSON of single popular dish and its specific information.

`GET /:restaurantId/popularDish`

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

`GET /:restaurantId/popularDish`

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

`GET /:restaurantId/popularDish/:popularDishId`

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


### Create (POST)

create one popular dish record to the database.

`POST /:restaurantId/popularDish/`

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |

#### Data Parameters
| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `popularDishId`  | `integer`     | *Required.* dish identifier for the targeted popular dish.             |
| `dishName`       | `string`      | the name of the popular dish.                                          |
| `price `         | `integer`     | the price of the dish                                                  |
| `phothCount`     | `integer`     | the number of photo data of the dish                                   |
| `reviewCount`    | `integer`     | the number of review comment of the dish                               |

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


### Update (PUT)

Update one dish record in the database.

`PUT /:restaurantId/popular/:popularDishId`

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |

#### Data Parameters
| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `popularDishId`  | `integer`     | *Required.* dish identifier for the targeted popular dish.             |
| `dishName`       | `string`      | the name of the popular dish.                                          |
| `price `         | `integer`     | the price of the dish                                                  |
| `phothCount`     | `integer`     | the number of photo data of the dish                                   |
| `reviewCount`    | `integer`     | the number of review comment of the dish                               |

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

### Delete (DELETE)

Delete one dish record from the database.

`DELETE /:restaurantId/popular/:popularDishId`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |
| `popularDishId`  | `integer`     | *Required.* dish identifier for the targeted popular dish.             |

### Database Schema
