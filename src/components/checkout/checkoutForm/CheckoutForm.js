import React, { useEffect, useState } from "react";
import styles from './CheckoutForm.module.scss'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Card from "../../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import {Spinner} from '../../loader/Loader'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {CreateOrder} from '../../../redux/features/order/orderSlice'

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {cartTotalAmount,cartItems} =useSelector((state)=>state.cart)
  const {paymentMethod,shippingAddress,billingAddress} =useSelector((state)=>state.checkout)
  const {coupon} =useSelector((state)=>state.coupon)

//   const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const saveOrderToDB=()=>{
    const today=new Date();
    const formData={
      orderDate:today.toDateString(),
      orderTime:today.toLocaleTimeString(),
      orderAmount:cartTotalAmount,
      orderStatus:'Order Placed....',
      cartItems,
      paymentMethod,
      shippingAddress,
      billingAddress,
      coupon
    }
    dispatch(CreateOrder(formData))
    navigate('/checkout-success')
  }
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(clientSecret);
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
      await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
      },
      redirect:'if_required'
    })
    .then((result)=>{
        if(result.error){
            console.log(result.error);
            toast.error(result.error.message);
            setMessage(result.error.message)
            return;
        }
        if(result.paymentIntent){
            console.log(result);
            if(result.paymentIntent.status==='succeeded'){
                setIsLoading(false);
                toast.success('Payment Successful');
                saveOrderToDB();
            }
        }
    })
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
    <section>
        <div className={`container ${styles.checkout}`}>
             <form onSubmit={handleSubmit}>
              <div>
                <Card cardClass={styles.card}>
                    <CheckoutSummary/>
                </Card>
              </div>

              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                <PaymentElement id={styles['payment-element']} paymentElementOptions={paymentElementOptions}/>
                <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.button}>
                <span id="button-text">
                    {isLoading ? <Spinner/> : "Pay now"}
                </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id={styles['payment-message']}>{message}</div>}
                </Card>
              </div>
             
           </form>
        </div>
    </section>
    </>
  );
}