/* eslint-disable eqeqeq */
/* eslint-disable arrow-parens */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-mutable-exports */
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  rps: 1000,
  vus: 150,
  duration: '3m',
};

export default function () {
  let randResId = Math.floor(Math.random() * 1000);
  let randDishId = Math.floor(Math.random() * 1000);
  const res1 = http.get(`http://localhost:3002/api/popularDish/${randResId}`);
  check(res1, {
    "status was 200": (res) => res.status == 200,
    "transaction time OK": (res) => res.timings.duration < 200
  });
  sleep(1);
  // post test
  const url = `http://localhost:3002/api/popularDish/${randResId}`;
  const payload = JSON.stringify({
    popularDishId: 12,
    dishImage: `https://gastrodamus-images.s3.us-east-2.amazonaws.com/dish/${randDishId}.jpg`,
    dishName: "aspernaturs",
    dishPrice: 46,
    photoCount: 65,
    reviewCount: 27
  });
  const params = { headers: { "Content-Type": "application/json" } };
  const res2 = http.post(url, payload, params);
  check(res2, {
    "status was 200": (res) => res.status == 200,
    "transaction time OK": (res) => res.timings.duration < 200
  });
}
