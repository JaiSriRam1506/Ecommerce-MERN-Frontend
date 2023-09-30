import {configureStore} from '@reduxjs/toolkit'
import authReducers from './features/auth/authSlice'
import CatBrandReducers from './features/category-brand/CatBrandSlice';
import ProductReducers from './features/product/productSlice'

export const store=configureStore({
    reducer:{
        auth:authReducers,
        category:CatBrandReducers,
        product:ProductReducers
    }
});