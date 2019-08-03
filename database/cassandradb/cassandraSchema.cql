DROP KEYSPACE IF EXISTS restaurants_popular_dishes;
CREATE KEYSPACE IF NOT EXISTS restaurants_popular_dishes
WITH replication = {
   'class': 'SimpleStrategy',
   'replication_factor': 1
};

USE restaurants_popular_dishes;

CREATE TABLE restaurants_popular_dishes.restaurants (
   restaurant_id     uuid,
   restaurant_name   text
   PRIMARY KEY (restaurant_id)
)

CREATE TABLE restaurants_popular_dishes.dishes_by_restaurants (
   restaurant_id     uuid,
   dish_id           int, 
   dish_images       varchar,
   dish_name         varchar,
   dish_price        int,
   photo_count       int,
   review_count      int,
   PRIMARY KEY (restaurant_id, dish_id)
);

