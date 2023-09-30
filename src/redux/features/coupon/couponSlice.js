import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CouponService from './couponService'
import {toast} from 'react-toastify'

const initialState = {
    coupon:null,
    coupons:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

//Create Coupon
export const createCoupon=createAsyncThunk('coupon/createCoupon',
    async(formData,thunkAPI)=>{
        try {
            return await CouponService.createCoupon(formData);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//getCoupons
export const getCoupons=createAsyncThunk('coupon/getCoupons',
    async(_,thunkAPI)=>{
        try {
            return await CouponService.getCoupons();
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//getCoupon
export const getCoupon=createAsyncThunk('coupon/getCoupon',
    async(name,thunkAPI)=>{
        try {
            return await CouponService.getCoupon(name);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//deleteCoupon
export const deleteCoupon=createAsyncThunk('coupon/deleteCoupon',
    async(id,thunkAPI)=>{
        try {
            return await CouponService.deleteCoupon(id);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    COUPON_RESET(state){
        state.isError=false
        state.isSuccess=false
        state.isLoading=false
        state.message=""
        }
  },
  extraReducers:(builder)=>{
    builder
            //Create Coupon
            .addCase(createCoupon.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(createCoupon.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.coupon=action.payload.data
              toast.success(action.payload.message);
            })
            .addCase(createCoupon.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload.message
              toast.error(action.payload);
            })

            //get Coupons
            .addCase(getCoupons.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getCoupons.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.coupons=action.payload.data
              //toast.success(action.payload.message);
            })
            .addCase(getCoupons.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload.message
              toast.error(action.payload);
            })

            //get Coupon
            .addCase(getCoupon.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getCoupon.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.coupon=action.payload.data
              //toast.success(action.payload.message);
            })
            .addCase(getCoupon.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload.message
              toast.error(action.payload);
            })
            
            //delete Coupon
            .addCase(deleteCoupon.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(deleteCoupon.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.coupon=null
              toast.success(action.payload.message);
            })
            .addCase(deleteCoupon.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload.message
              toast.error(action.payload);
            })
    }
});

export const {COUPON_RESET} = couponSlice.actions

export default couponSlice.reducer