CREATE TABLE restaurant (
   restaurant_id   int,
   restaurant_name varchar,
   PRIMARY KEY(restaurant_id)
);
/* photo_count and review_count will be replaced with foreign key in the proxy version */
CREATE TABLE dish (
   restaurant_id int,
   dish_id       int,
   dish_images   varchar,
   dish_name     varchar,
   price_dish,   int,
   photo_count,  int,
   review_count  int,
   PRIMARY KEY (restaurant_id, dish_id)
);
