import React, { useState } from 'react'
import './Radio.scss'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SAVE_PAYMENT_METHOD } from '../../redux/features/checkout/checkoutSlice'

const PaymentOptions = () => {
 const [paymentMethod, setPaymentMethod] = useState("")
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const {isLoggedIn}=useSelector((state)=>state.auth)

  const setPayment=(e)=>{
    e.preventDefault();

    if(paymentMethod==='')return toast.error('Please select Payment Mode')
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));
    if(isLoggedIn){
        navigate('/checkout-details')
    }else{
        navigate('/login?redirect=cart')
    }

  }
  return (
    <>
    <p>Please choose a Payment Mode</p>
    <form className='--form-control' onSubmit={setPayment}>
        <label htmlFor='stripe' className='radio-label'>
            <input className='radio-input' type='radio' name='paymentMethod' id='stripe' value={'stripe'} 
            onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span className='custom-radio'></span>
            Stripe
        </label>
        <label htmlFor='flutterwave' className='radio-label'>
            <input className='radio-input' type='radio' name='paymentMethod' id='flutterwave' value={'flutterwave'} 
            onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span className='custom-radio'></span>
            Flutterwave
        </label>
        <label htmlFor='paypal' className='radio-label'>
            <input className='radio-input' type='radio' name='paymentMethod' id='paypal' value={'paypal'} 
            onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span className='custom-radio'></span>
            Paypal
        </label>
        <label htmlFor='wallet' className='radio-label'>
            <input className='radio-input' type='radio' name='paymentMethod' id='wallet' value={'wallet'} 
            onClick={(e)=>setPaymentMethod(e.target.value)} />
            <span className='custom-radio'></span>
            Wallet
        </label>
        <button className='--btn --btn-primary --btn-block'>Checkout</button>
    </form>
    </>
  )
}

export default PaymentOptions