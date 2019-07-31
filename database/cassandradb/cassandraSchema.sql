DROP KEYSPACE IF EXISTS restaurants_popular_dishes;
CREATE KEYSPACE IF NOT EXISTS restaurants_popular_dishes
WITH replication = {
   'class': 'SimpleStrategy',
   'replication_fator': 1
};

CREATE TABLE restaurants (
   restaurant_id  uuid  PRIMARY KEY,
   restaurant_name      text
);

/* photo_count and review_count will be replaced with foreign key in the proxy version */
CREATE TABLE dishes_by_restaurants (
   restaurant_id uuid,
   dish_id       int, --colume
   dish_images   varchar,
   dish_name     varchar,
   price_dish,   int,
   photo_count,  int,
   review_count  int,
   PRIMARY KEY (restaurant_id, dish_id)
);


--keyspace -> restaurants_popular_dishes
--PRIMARY KEY(<partition key>,<cluster key>)
--
