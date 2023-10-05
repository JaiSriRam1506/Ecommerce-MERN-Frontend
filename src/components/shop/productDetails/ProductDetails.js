import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import {Link, useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import productSlice, { getProduct } from '../../../redux/features/product/productSlice'
import Spinner from '../../loader/Loader'
import ProductRating from '../productRating/ProductRating'
import { calculateAverageRating,shortenText } from '../../../utils'
import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'
import Card from '../../card/Card'
import { CART_OP, saveToCart } from '../../../redux/features/cart/cartSlice'

const ProductDetails = () => {
  const {id}=useParams();
  const {isLoading,product}=useSelector((state)=>state.product)
  const [imageIndex, setImageIndex] = useState(0)
  const dispatch=useDispatch();
  const averageRating=calculateAverageRating(product?.ratings)

  const {cartItems}=useSelector((state)=>state.cart)
  const cartProduct=cartItems.find((cartItem)=>cartItem._id===id);

  useEffect(()=>{
    dispatch(getProduct(id))
  },[dispatch,id])

  const slideLength=product?.image?.length;
  const nextSlide=()=>{
    setImageIndex(imageIndex===slideLength-1?0:imageIndex+1);
  }
  let slideInterval;

  useEffect(()=>{
    if(product?.image?.length>1){
      const auto=()=>{
        slideInterval=setInterval(nextSlide,3000);
      }
      auto();
    }
    return ()=>clearInterval(slideInterval)
  },[imageIndex,product,slideInterval])


  const addToCart=async(product)=>{
      await dispatch(CART_OP({product,Op:'add'}));
      await dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
  }

  const removeFromCart=(product)=>{
    dispatch(CART_OP({product,Op:'sub'}));
    dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
}

  return (
    <section>
    <div className={`container ${styles.product}`}>
      <h2>Product Details</h2>
      <div>
        <Link to='/shop'>&larr;Back to Home</Link>
      </div>
      {isLoading?(<Spinner/>):(
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product?.image[imageIndex]} alt={product?.name} className={styles.pImg}/>
            <div className={styles.smallImg}>
              {product?.image.map((image,index)=>{
                return(
                  <img key={index} src={image} alt='product' onClick={()=>setImageIndex(index)}
                  className={imageIndex===index?'activeImg':''}/>
                )
              })}
            </div>
            </div>
            <div className={styles.content}>
                <h3>{shortenText(product?.name,35)}</h3>
                <ProductRating averageRating={averageRating} noOfRating={product?.ratings?.length}/>
                <div className='--underline'></div>
                <div className={styles.property}>
                  <p>
                    <b>Price:</b>
                  </p>
                  <p className={styles.price}>{`Rs ${product?.price}`}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>SKU:</b>
                  </p>
                  <p>{product?.sku}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Category:</b>
                  </p>
                  <p>{product?.category}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Brand:</b>
                  </p>
                  <p>{product?.brand}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Color:</b>
                  </p>
                  <p>{product?.color}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Quantity In Stock:</b>
                  </p>
                  <p>{product?.quantity}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Sold:</b>
                  </p>
                  <p>{product?.sold}</p>
                </div>
                {cartProduct?(
                    <div className={styles.count}>
                    <>
                    <button className='--btn' onClick={()=>addToCart(product)}>+</button>
                    <p><b>{cartProduct.cartQuantity}</b></p>
                    <button className='--btn' onClick={()=>removeFromCart(product)}>-</button>
                    </>
                </div>):null}
                <div className='--flex-start'>
                {product?.quantity>0?(
                    <button className='--btn --btn-primary' onClick={()=>addToCart(product)}>
                        Add to Cart
                    </button> 
                ):(
                    <button className='--btn --btn-red' onClick={()=>toast.error('Sorry the product is out of stock')}>
                        Out of Stock
                    </button>
                )}
                  {product?.quantity>0 && <button className='--btn --btn-danger'>
                        Add to Wishlist
                    </button>}
                </div>
                <div><b><div dangerouslySetInnerHTML={{__html:
                        DOMPurify.sanitize(shortenText(product?.description,300))}}/></b></div>
            </div>
          </div>
        </>
      )}
      <Card className={styles.card}>
        <h3>Product Review ???</h3>
      </Card>
    </div>
  </section>
  )
}

export default ProductDetails