import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../card/Card'
import { COUPON_RESET, getCoupon } from '../../redux/features/coupon/couponSlice'

export const CartDiscount=()=>{
  const {initialCartTotalAmount}=useSelector((state)=>state.cart)
  const {coupon}=useSelector((state)=>state.coupon)
  return(
    <>
    {coupon && (
      <Card className='card-msg'>
      <p className='--center-all'>
         Initial Total Amount:{initialCartTotalAmount} RS | Coupon:{coupon?.name} | Discount:{coupon?.discount}%
      </p>
  </Card>
    )}
    </>
  )
}

const VerifyCoupon = () => {
  const dispatch=useDispatch();
  const {coupon}=useSelector((state)=>state.coupon)
  const {cartTotalAmount,initialCartTotalAmount}=useSelector((state)=>state.cart)
  const [couponName, setCouponName] = useState("")
  const [showForm, setShowForm] = useState(false);

  const removeCoupon=()=>{
    dispatch(COUPON_RESET())
    setCouponName("")
  }
  const verifyCoupon=(e)=>{
    e.preventDefault();
    dispatch(getCoupon(couponName));
  }


  return (
    <>
    <CartDiscount/>
    <div className='--flex-between'>
      <p>Have a Coupon</p>
      {coupon===null?(
         <p className='--cursor --color-primary'onClick={()=>setShowForm(true)}><b>Add a Coupon</b></p>
      ):(
        <p className='--cursor --color-primary'onClick={removeCoupon}><b>Remove  Coupon</b></p>
      )}
    </div>
    {showForm &&(
       <form onSubmit={verifyCoupon} className='--form-control'>
       <input type='text' value={couponName} name='Coupon' placeholder='Coupon Name' required
       onChange={(e)=>setCouponName(e.target.value.toUpperCase())}/>
       <button type='submit' className='--btn --btn-primary'>Verify</button>
     </form>
    )}
    </>
  )
}

export default VerifyCoupon