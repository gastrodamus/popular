CREATE ROLE root WITH SUPERUSER;

DROP DATABASE IF EXISTS restaurant_popular_dishes;
CREATE DATABASE restaurant_popular_dishes;
\connect restaurant_popular_dishes

DROP SCHEMA IF EXISTS popular_dishes_schema CASCADE;
CREATE SCHEMA IF NOT EXISTS popular_dishes_schema AUTHORIZATION "root";
  CREATE TABLE popular_dishes_schema.restaurant (
    restaurant_id    SERIAL PRIMARY KEY,
    restaurant_name  VARCHAR(80) NOT NULL CHECK (char_length(first_name) < 80)
  );

  CREATE TABLE popular_dishes_schema.popular_dish (
    dish_id       SERIAL PRIMARY KEY,
    restaurant_id SERIAL PRIMARY KEY REFERENCES popular_dishes_schema.restaurant(restaurant_id),
    dish_image   TEXT,
    dish_name     VARCHAR(80) NOT NULL CHECK (char_length(first_name) < 80),
    price_dish    INTEGER,
    photo_count   INTEGER,
  );

  CREATE TABLE popular_dishes_schema.popular_dish_review (
    review_id     SERIAL PRIMARY KEY,
    restaurant_id SERIAL PRIMARY KEY REFERENCES popular_dishes_schema.restaurant(restaurant_id),
    dish_id       SERIAL PRIMARY KEY REFERENCES popular_dishes_schema.popular_dish(dish_id),
  )
