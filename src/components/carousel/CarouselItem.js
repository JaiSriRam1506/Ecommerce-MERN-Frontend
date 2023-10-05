import React from 'react'
import './Carousel.scss'
import { Link } from 'react-router-dom'
import {shortenText} from '../../utils/index'
import { useDispatch } from 'react-redux'
import { CART_OP, saveToCart } from '../../redux/features/cart/cartSlice'

const removeHTMLTags=(input)=>{
  const regex=/<[^>]+>/g;
  return input?.replace(regex,"");
}

/*Each Carousel Item template */
const CarouselItem = ({imageURL,name,price,regularPrice,description,product}) => {
  const dispatch=useDispatch()
  const des=removeHTMLTags(description);
  const addToCart=async(product)=>{
    await dispatch(CART_OP({product,Op:'add'}));
    await dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
}
  return (
    <div className='carouselItem'>
        <Link to={`/product-details/${product?._id}`}>
            <img className='product--image' src={imageURL} alt='Product' />
            <p className='price'>
              <span>{regularPrice>0 && <del>{regularPrice}</del>}</span>
              {price}
              </p>
            <h4>{shortenText(name,18)}</h4>
            <p className='--mb'>{shortenText(des,26)}</p>
        </Link>
        <button className='--btn --btn-primary --btn-block' onClick={()=>addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default CarouselItem;