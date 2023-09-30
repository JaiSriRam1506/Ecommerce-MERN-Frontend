import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify';
import { createCoupon, getCoupons } from '../../../redux/features/coupon/couponSlice';

function CreateCoupon() {
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [expiresAt, setExpiresAt] = useState(new Date());
    const {isLoading}=useSelector((state)=>state.coupon);
   
    const dispatch=useDispatch();
    const saveCoupon=async(e)=>{
      console.log(coupon,discount,expiresAt)
      e.preventDefault();
      if(coupon.length<6)toast.error("Coupon must be at 6 Character")
      if(discount<1)toast.error("Coupon discount must be greater than 1%")
      const formData={
        coupon,
        discount,
        expiresAt
      }
      await dispatch(createCoupon(formData))
      dispatch(getCoupons())
      setCoupon('');
      setExpiresAt(new Date());
      setDiscount(0);
    }
    return (
      <>
      {isLoading && <Loader/>}
      <div className="--underline"></div>
        <br />
        <div className='--mb2'>
          <h3>Create Coupon</h3>
          <p>Use the form to <b>Create the Coupon.</b></p>
          <Card cardClass={"coupon card"}>
              <br />
              <form onSubmit={saveCoupon}>
                <label>Coupon Name:</label>
                <input type='text' placeholder='Coupon Name' value={coupon} name='coupon' onChange={(e)=>setCoupon(e.target.value)} required/>
                <label>Discount %:</label>
                <input type='number' placeholder='Coupon Discount' value={discount} name='discount' onChange={(e)=>setDiscount(e.target.value)} required/>
                <label>ExpiresAt:</label>
                <DatePicker 
                selected={expiresAt}
                value={expiresAt} onChange={(date)=>setExpiresAt(date)} required/>
                <div className='--my'>
                  <button type='submit' className='--btn --btn-primary'>Save Coupon</button>
                </div>
              </form>
          </Card>
        </div>
      </>
    )
}

export default CreateCoupon