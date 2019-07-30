

# Popular dish service API reference

What are your service's inputs and outputs (API Spec)?

`GET /:restaurantId/popularDish`

`GET /:restaurantId/popularDish/:dishId`


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

### Create (POST)

create one popular dish record to the database.

`POST /:restaurantId/popularDish/`

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |
| `dishId`         | `integer`     | *Required.* dish identifier for the targeted popular dish.             |

#### Data Parameters
| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `dishId`         | `integer`     | *Required.* dish identifier for the targeted popular dish.             |
| `dishName`       | `string`      | the name of the popular dish.                                          |
| `price `         | `integer`     | the price of the dish                                                  |
| `phothCount`     | `integer`     | the number of photo data of the dish                                   |
| `reviewCount`    | `integer`     | the number of review comment of the dish                               |

#### Output
```
{
  dishId: <Number>,
  dishName: <String>,
  price: <Number>,
  photoCount: <Number>,
  reviewCount: <Number>
}
```


### Update (PUT)

Update one review record in the database.

`PUT /:restaurantId/popular/`

#### URL Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |

#### Data Parameters
| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `dishId`         | `integer`     | *Required.* dish identifier for the targeted popular dish.             |
| `dishName`       | `string`      | the name of the popular dish.                                          |
| `price `         | `integer`     | the price of the dish                                                  |
| `phothCount`     | `integer`     | the number of photo data of the dish                                   |
| `reviewCount`    | `integer`     | the number of review comment of the dish                               |

#### Output
```
{
  dishId: <Number>,
  dishName: <String>,
  price: <Number>,
  photoCount: <Number>,
  reviewCount: <Number>
}
```

### Delete (DELETE)

Delete one review record from the database.

`DELETE /:restaurantId/popular/`

#### Parameters

| Name             | Type          | Description                                                            |
| ---------------- |:-------------:| :----------------------------------------------------------------------|
| `restaurantId`   | `integer`     | *Required.* Restaurant identifier for the targeted restaruant.         |

### Database Schema
