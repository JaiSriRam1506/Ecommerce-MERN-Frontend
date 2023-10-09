import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Confetti from 'react-confetti'
import {useDispatch} from 'react-redux'
import { REMOVE_ALL } from '../../redux/features/cart/cartSlice'

const CheckoutSuccess = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(REMOVE_ALL())
  },[])
  return (
    <>
      <Confetti/>
      <section style={{height:'70vh'}}>
        <div className='container'>
          <h2>Order Placed Successfully</h2>
          <p>Thank you for Shopping</p>
          <br/>
          <button className='--btn --btn-primary'>
            <Link to='/order-history'>View Order Details</Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default CheckoutSuccess