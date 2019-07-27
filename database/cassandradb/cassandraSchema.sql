CREATE TABLE restaurant (
   restaurant_id   int,
   restaurant_name varchar,
   PRIMARY KEY(restaurant_id)
);
/* photo_count and review_count will be replaced with foreign key in the proxy version */
CREATE TABLE dish (
   dish_id       int,
   restaurant_id int,
   dish_images   varchar,
   dish_name     varchar,
   price_dish,   int,
   photo_count,  int,
   PRIMARY KEY (restaurant_id, dish_id)
);

CREATE TABLE review (
   review_id   int,
   restaurant_id int,
   dish_id varchar,
   PRIMARY KEY(review_id, restaurant_id, dish_id)
);