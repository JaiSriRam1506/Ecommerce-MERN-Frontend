import React from 'react'
import './Carousel.scss'
import { Link } from 'react-router-dom'
import {shortenText} from '../../utils/index'

const CarouselItem = ({imageURL,name,price,description}) => {
  const addToCart=()=>{};
  return (
    <div className='carouselItem'>
        <Link to='/product-details'>
            <img className='product--image' src={imageURL} alt='Product' />
            <p className='price'>Rs {price}</p>
            <h4>{shortenText(name,18)}</h4>
            <p className='--mb'>{shortenText(description,26)}</p>
        </Link>
        <button className='--btn --btn-primary --btn-block' onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default CarouselItem;