import './Checkout.scss'
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../../components/checkout/checkoutForm/CheckoutForm';
import { extractCartQuantity_Id } from '../../utils';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {cartItems,cartTotalAmount}=useSelector((state)=>state.cart)
    const {shippingAddress}=useSelector((state)=>state.checkout)
    const {coupon} =useSelector((state)=>state.coupon)

    const id_Qty=extractCartQuantity_Id(cartItems)
    const user=useSelector((state)=>state.auth)
    const description=`Payment Done by ${user.email} for ${cartTotalAmount} on Date${Date.now()}`
    const [message, setMessage] = useState("Initializing Checkout....")

    const initiatePayment=async()=>{
       console.log(BACKEND_URL+'/api/v1/payment/stripe-payment-intent');
        try {
            // const response= await axios.post(`${BACKEND_URL}/api/v1/payment/stripe-payment-intent`,JSON.stringify({ 
            //     items: id_Qty,
            //     shipping:shippingAddress,
            //     description,
            //     coupon
            //  }));

             const response= await axios({
              method: "POST",
              url: `${BACKEND_URL}/api/v1/payment/stripe-payment-intent`,
              headers: { "Content-Type": "application/json" },
              data: JSON.stringify({
                items: id_Qty,
                shipping:shippingAddress,
                description,
                coupon
              })
            })

            //  const response=await fetch(
            //   `${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`,
            //   {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //       items: id_Qty,
            //       shipping:shippingAddress,
            //       description,
            //       coupon
            //     }),
            //   }
            // )
             setClientSecret(response?.data?.data?.clientSecret)
            
        } catch (error) {
            setMessage('Failed to initialize Checkout: '+error.toString())
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
     initiatePayment()
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <>
      <section>
        <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
        </div>
      </section>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </>
    );
}

export default Checkout