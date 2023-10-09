import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CART_OP, CART_TOTAL_QUANTITY_PRICE, REMOVE_ALL, saveToCart } from '../../../redux/features/cart/cartSlice'
import { Link } from 'react-router-dom';
import styles from './CheckoutSummary.module.scss'
import Card from '../../card/Card';
import { CartDiscount } from '../../verifyCoupon/VerifyCoupon';

const CheckoutSummary = () => {
  const dispatch=useDispatch();
  const {cartItems,cartTotalQuantity,cartTotalAmount}=useSelector((state)=>state.cart)
  const {coupon}=useSelector((state)=>state.coupon)
  useEffect(()=>{
    dispatch(CART_TOTAL_QUANTITY_PRICE({value:'add',coupon}))
  },[dispatch,cartItems,cartTotalAmount,cartTotalQuantity,coupon])

  return (
      <div>
        <h3>Checkout Summary</h3>
        <div>
            {cartItems?.length===0?(
                <>
                  <p>No items in your Cart</p>
                  <button className='--btn'>
                    <Link to='/#products'> Back to Shop</Link>
                  </button>
                </>
            ):(
                <div>
                    <p><b>{`Cart Items(s):${cartTotalQuantity}`}</b></p>
                    <div className={styles.text}>
                        <h4>SubTotal:</h4>
                        <h3>{cartTotalAmount.toFixed(2)}</h3>
                    </div>
                    <CartDiscount/>
                    {cartItems.map((item)=>{
                        const {_id,name,price,cartQuantity}=item;
                        return(
                            <Card key={_id} cardClass={styles.card}>
                                <h4>Product Name:{name}</h4>
                                <p>Quantity:{cartQuantity}</p>
                                <p>Unit Price:{price}</p>
                                <p>Total Price:{cartQuantity*price}</p>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
      </div>
  )
}

export default CheckoutSummary