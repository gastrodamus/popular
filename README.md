

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



### Database Schema
