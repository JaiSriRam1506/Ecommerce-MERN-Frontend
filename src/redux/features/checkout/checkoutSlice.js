import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paymentMethod:localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):"",
    shippingAddress:localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):"",
    billingAddress:localStorage.getItem('billingAddress')?JSON.parse(localStorage.getItem('billingAddress')):""
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_PAYMENT_METHOD(state,actions){
        state.paymentMethod=actions.payload
        localStorage.setItem('paymentMethod',JSON.stringify(actions.payload));
    },
    SAVE_SHIPPING_ADDRESS(state,actions){
        state.shippingAddress=actions.payload
        localStorage.setItem('shippingAddress',JSON.stringify(actions.payload));
    },
    SAVE_BILLING_ADDRESS(state,actions){
        state.billingAddress=actions.payload
        localStorage.setItem('billingAddress',JSON.stringify(actions.payload));
    }
  }
});

export const {SAVE_PAYMENT_METHOD,SAVE_BILLING_ADDRESS,SAVE_SHIPPING_ADDRESS} = checkoutSlice.actions

export default checkoutSlice.reducer