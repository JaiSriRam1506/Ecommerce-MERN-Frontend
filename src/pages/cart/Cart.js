import React, { useEffect } from 'react'
import styles from './Cart.module.scss'
import './Radio.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CART_OP, CART_TOTAL_QUANTITY_PRICE, REMOVE_ALL, saveToCart } from '../../redux/features/cart/cartSlice'
import {FaTrash} from 'react-icons/fa'
import { shortenText } from '../../utils'
import Card from '../../components/card/Card'
import VerifyCoupon from '../../components/verifyCoupon/VerifyCoupon'


const Cart = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {coupon}=useSelector((state)=>state.coupon)
  const {cartItems,cartTotalQuantity,cartTotalAmount} =useSelector((state)=>state.cart)

  useEffect(()=>{
    dispatch(CART_TOTAL_QUANTITY_PRICE({value:'add',coupon}))
  },[dispatch,cartItems,cartTotalAmount,cartTotalQuantity,coupon])


const addToCart=(product)=>{
    dispatch(CART_OP({product,Op:'add'}));
    dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
}
const removeFromCart=(product)=>{
  dispatch(CART_OP({product,Op:'sub'}));
  dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
}
const clearFromCart=(product)=>{
    dispatch(CART_OP({product,Op:'clear'}));
    dispatch(saveToCart({cartItems:JSON.parse(localStorage.getItem('cartItems'))}))
  }
const removeAll=()=>{
    dispatch(REMOVE_ALL());
    dispatch(saveToCart({cartItems:[]}))
  }

  return (
    <section>
        <div className={`conatainer ${styles.table}`}>
            <h2>Shopping Cart</h2>
            {cartItems.length===0?(
                <>
                    <p className='--text-center'><b>Your Cart is Empty</b></p>
                    <br/>
                    <div className='--text-center'>
                        <Link to='/shop'>&larr;Continue Shopping</Link>
                    </div>
                </>
            ):(
                <>
                    <table>
                        <thead>
                            <tr>
                                <td>s/n</td>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Total Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.map((item,index)=>{
                                const {_id,name,price,image,cartQuantity}=item;
                                return(
                                    <tr key={_id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <p><b>{shortenText(name,50)}</b></p>
                                            <img src={image[0]} alt={name} style={{width:"100px",height:"100px"}}/>
                                        </td>
                                        <td>{price}</td>
                                        <td>
                                        <div className={styles.count}>
                                        <>
                                        <button className='--btn' onClick={()=>addToCart(item)}>+</button>
                                        <p><b>{cartQuantity}</b></p>
                                        <button className='--btn' onClick={()=>removeFromCart(item)}>-</button>
                                        </>
                                        </div>
                                        </td>
                                        <td>Rs {cartQuantity*price}</td>
                                        <td className={styles.icons}>
                                            <FaTrash size={19} color='red' onClick={()=>clearFromCart(item)}/>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <div className={styles.summary}>
                        <button className='--btn --btn-danger' onClick={removeAll}>Clear Cart</button>
                        <div className={styles.checkout}>
                            <div><Link to="/shop">&larr;Continue Shopping</Link></div>
                            <br/>
                            <Card cardClass={styles.card}>
                                <p>
                                    <b>{`Cart Item(s):${cartTotalQuantity}`}</b>
                                </p>
                                <div className={styles.text}>
                                    <h4>SubTotal</h4>
                                    <h3>{`Rs ${cartTotalAmount.toFixed(2)}`}</h3>
                                </div>
                               <VerifyCoupon/>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    </section>
  )
}

export default Cart