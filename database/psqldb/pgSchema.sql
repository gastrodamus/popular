DROP DATABASE IF EXISTS restaurant_popular_dishes;
CREATE DATABASE restaurant_popular_dishes;
\connect restaurant_popular_dishes root

-- DROP SCHEMA IF EXISTS popular_dishes_schema CASCADE;
-- CREATE SCHEMA IF NOT EXISTS popular_dishes_schema AUTHORIZATION "root";

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

CREATE TABLE popular_dish_review (
  review_id         SERIAL PRIMARY KEY,
  restaurant_id     INTEGER,
  popular_dish_id   INTEGER
);

CREATE TABLE popular_dish_photo (
  photo_id        SERIAL PRIMARY KEY,
  restaurant_id   INTEGER,
  photo_url       TEXT
)

-- add foreign key for dish_id in review and photo table -> don't need popular_dish_id anymore
-- add photo count table later