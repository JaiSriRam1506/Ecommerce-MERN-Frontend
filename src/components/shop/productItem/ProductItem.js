import React from 'react'
import Card from '../../../components/card/Card'
import styles from './ProductItem.module.scss'
import {Link} from 'react-router-dom'
import {calculateAverageRating, shortenText} from '../../../utils/index'
import {toast} from 'react-toastify'
import DOMPurify from 'dompurify'
import ProductRating from '../productRating/ProductRating'
import { useDispatch } from 'react-redux'
import { CART_OP, saveToCart } from '../../../redux/features/cart/cartSlice'

const ProductItem = ({
    product,grid,_id,name,regularPrice,price,image
}) => {

const averageRating=calculateAverageRating(product?.ratings)
const dispatch=useDispatch()

const addToCart=async(product)=>{
    await dispatch(CART_OP({product,Op:'add'}));
    await dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
}
  return (
    <Card cardClass={grid?`${styles.grid}`:`${styles.list}`}>
        <Link to={`/product-details/${_id}`}>
            <div className={styles.img}>
                <img src={image[0]} alt={name}/>
            </div>
        </Link>
        <div className={styles.content}>
            <div className={styles.details}>
                <p>
                    <span>{regularPrice>0 && <del>Rs{regularPrice}</del>}</span>
                    {` Rs${price}`}
                </p>
                <ProductRating averageRating={averageRating} noOfRating={product?.ratings?.length}/>
                <h4>{shortenText(name,18)}</h4>
                {!grid && <div dangerouslySetInnerHTML={{__html:
                        DOMPurify.sanitize(shortenText(product?.description,150))}}></div>
                }
            </div>
                {product?.quantity>0?(
                    <button className='--btn --btn-primary' onClick={()=>addToCart(product)}>
                        Add to Cart
                    </button>
                ):(
                    <button className='--btn --btn-red' onClick={()=>toast.error('Sorry the product is out of stock')}>
                        Out of Stock
                    </button>
                )}
        </div>
    </Card>
  )
}

export default ProductItem