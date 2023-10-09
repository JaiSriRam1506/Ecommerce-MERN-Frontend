import React, { useEffect, useState } from 'react'
import styles from './CheckoutDetails.module.scss'
import Card from '../../components/card/Card'
import {CountryDropdown} from 'react-country-region-selector'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/features/checkout/checkoutSlice'
import {toast} from 'react-toastify'
import CheckoutSummary from '../../components/checkout/checkoutSummary/CheckoutSummary'

const initialAddressState={
    name:'',
    line1:'',
    line2:'',
    city:'',
    state:'',
    postal_code:'',
    country:'',
    phone:''
}

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({...initialAddressState,})
  const [billingAddress, setBillingAddress] = useState({...initialAddressState,})
  const dispatch=useDispatch();
  const navigate=useNavigate()

  const {paymentMethod,shippingAddress:shipAdd,billingAddress:billAdd}=useSelector((state)=>state.checkout)
  useEffect(()=>{
    if(Object.keys(shipAdd).length>0){
        setShippingAddress({...shipAdd})
    }
    if(Object.keys(billAdd).length>0){
        setBillingAddress({...billAdd})
    }
  },[shipAdd,billAdd])

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))

    if(paymentMethod===''){
        toast.info('Please select payment method')
        navigate('/cart')
    }
    if(paymentMethod==='stripe'){
        navigate('/checkout-stripe')
    }
    if(paymentMethod==='flutterwave'){
        navigate('/checkout-flutterwave')
    }
    if(paymentMethod==='paypal'){
        navigate('/checkout-paypal')
    }
    if(paymentMethod==='wallet'){
        navigate('/checkout-wallet')
    }
    
  }

  const handleShipping=(e)=>{
    const {name,value}=e.target;
    setShippingAddress({...shippingAddress,[name]:value})
  }

  const handleBilling=(e)=>{
    const {name,value}=e.target;
    setBillingAddress({...shippingAddress,[name]:value})
  }

  return (
    <section>
        <div className={`container ${styles.checkout}`}>
            <h2>Checkout Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Card cardClass={styles.card}>
                        <h3>Shipping Address</h3>
                        <label>Recipient Name</label>
                        <input type='text' value={shippingAddress?.name} name='name' 
                        placeholder='Recipient Name' required onChange={(e)=>handleShipping(e)}/>
                        <label>Address Line 1</label>
                        <input type='text' value={shippingAddress?.line1} name='line1' 
                        placeholder='Address Line 1' required onChange={(e)=>handleShipping(e)}/>
                        <label>Address Line 2</label>
                        <input type='text' value={shippingAddress?.line2} name='line2' 
                        placeholder='Address Line 2' required onChange={(e)=>handleShipping(e)}/>
                        <label>City</label>
                        <input type='text' value={shippingAddress?.city} name='city' 
                        placeholder='City' required onChange={(e)=>handleShipping(e)}/>
                        <label>State</label>
                        <input type='text' value={shippingAddress?.state} name='state' 
                        placeholder='State' required onChange={(e)=>handleShipping(e)}/>
                        <label>Postal Code</label>
                        <input type='text' value={shippingAddress?.postal_code} name='postal_code' 
                        placeholder='Postal Code' required onChange={(e)=>handleShipping(e)}/>
                        <label>Country</label>
                        <CountryDropdown
                        className={styles.select}
                        valueType='short'
                        value={shippingAddress.country}
                        onChange={(val)=>handleShipping({
                            target:{
                                name:'country',
                                value:val
                            }
                        })}/>
                        <label>Phone</label>
                        <input type='text' value={shippingAddress?.phone} name='phone' 
                        placeholder='Phone Number' required onChange={(e)=>handleShipping(e)}/>
                    </Card>
                    <Card cardClass={styles.card}>
                        <h3>Shipping Address</h3>
                        <label>Recipient Name</label>
                        <input type='text' value={billingAddress?.name} name='name' 
                        placeholder='Recipient Name' required onChange={(e)=>handleBilling(e)}/>
                        <label>Address Line 1</label>
                        <input type='text' value={billingAddress?.line1} name='line1' 
                        placeholder='Address Line 1' required onChange={(e)=>handleBilling(e)}/>
                        <label>Address Line 2</label>
                        <input type='text' value={billingAddress?.line2} name='line2' 
                        placeholder='Address Line 2' required onChange={(e)=>handleBilling(e)}/>
                        <label>City</label>
                        <input type='text' value={billingAddress?.city} name='city' 
                        placeholder='City' required onChange={(e)=>handleBilling(e)}/>
                        <label>State</label>
                        <input type='text' value={billingAddress?.state} name='state' 
                        placeholder='State' required onChange={(e)=>handleBilling(e)}/>
                        <label>Postal Code</label>
                        <input type='text' value={billingAddress?.postal_code} name='postal_code' 
                        placeholder='Postal Code' required onChange={(e)=>handleBilling(e)}/>
                        <label>Country</label>
                        <CountryDropdown
                        className={styles.select}
                        valueType='short'
                        value={shippingAddress.country}
                        onChange={(val)=>handleBilling({
                            target:{
                                name:'country',
                                value:val
                            }
                        })}/>
                        <label>Phone</label>
                        <input type='text' value={billingAddress?.phone} name='phone' 
                        placeholder='Phone Number' required onChange={(e)=>handleBilling(e)}/>
                        <button className='--btn --btn-primary' type='submit'> Proceed to Checkout</button>
                    </Card>
                </div>
                <div>
                    <Card cardClass={styles.card}>
                        <CheckoutSummary/>
                    </Card>
                </div>
            </form>
        </div>
    </section>
  )
}

export default CheckoutDetails;