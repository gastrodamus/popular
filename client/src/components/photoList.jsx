import React from 'react';
import style from '../style.css'


const Photolist = (props) => {
    // Note:  A better way to do this is have 10 different documents from Mongo created with the same resturant ID and map them out
  return (
    <div className = {style.containerForPopularDishImage} id = 'containerForContent'> 
        {props.data.map(pic =>
        <div className = {style.test}>
          <div className = {style.containerForImagesAndContent}>
              <div className = {style.popularDishDivContainer}>
                  <img className ={style.popularDishImages} src= {pic.dish_image}  ></img>
                  <span className = {style.popularDishPrice}>${pic.price_dish}.00</span>
              </div>
              <div className = {style.popularDishName}>
                  {pic.name}
              </div>
              <div className = {style.containerForPhotoCountAndReview}>
                  <small className = {style.popularDishPhotoCount }>{pic.photo_count} Photos</small>
                  <small className = {style.popularDishImportantDot}>•</small>
                  <small className = {style.popularDishReviewCount}>{pic.review_count} Reviews</small>
              </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default Photolist

