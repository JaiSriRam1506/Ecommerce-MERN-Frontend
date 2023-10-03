import {configureStore} from '@reduxjs/toolkit'
import authReducers from './features/auth/authSlice'
import CatBrandReducers from './features/category-brand/CatBrandSlice';
import ProductReducers from './features/product/productSlice'
import CouponReducers from './features/coupon/couponSlice'
import FilterReducers from './features/product/filterSlice'

export const store=configureStore({
    reducer:{
        auth:authReducers,
        category:CatBrandReducers,
        product:ProductReducers,
        coupon:CouponReducers,
        filter:FilterReducers
    }
});