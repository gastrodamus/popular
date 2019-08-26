### gastrodamus
popular dish photo carousel micro-service's backend architecture

## Table of Contents
 1. [Tech Stack](#tech-stack)
 2. [API reference](#api)
 3. [Usage](#usage)
 4. [Requirements](#requirements)
 5. [Related Projects](#related-projects)
 
## Tech Stack

Back-end: Node.js, Express, AWS EC2, Nginx, Redis, AWS S3

Database: PostgreSQL

Load testing: Loader.io, K6, New Relic

## API reference

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

## Usage
```
bash
# clone the current repo
$ git clone https://github.com/gastrodamus/popular.git

# install webpack
$ npm install webpack
$ npm install

# populate data to the database
$ npm run seed

# bundle js files with webpack
$ npm run react-dev

# run the app
$ npm run server
```


## Requirements

- Nvm
- Node
- Git

## Related Projects

  - https://github.com/gastrodamus/header
  - https://github.com/gastrodamus/reservation

