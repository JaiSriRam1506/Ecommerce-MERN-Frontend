import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import OrderService from './orderService'
import {toast} from 'react-toastify'

const initialState = {
    order:null,
    orders:[],
    totalOrderAmount:0,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const CreateOrder=createAsyncThunk('order/createOrder',async(formData,thunkAPI)=>{
    try {
        return await OrderService.createOrder(formData);
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const GetOrders=createAsyncThunk('order/getOrders',async(_,thunkAPI)=>{
    try {
        return await OrderService.getOrders();
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

export const GetOrder=createAsyncThunk('order/getOrder',async(id,thunkAPI)=>{
    try {
        return await OrderService.getOrder(id);
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

//Update Order Status
export const updateOrderStatus=createAsyncThunk('order/updateStatus',async({id,formData},thunkAPI)=>{
    try {
        return await OrderService.updateOrderStatus(id,formData);
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }

})

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    //Create Order
        .addCase(CreateOrder.pending,(state,action)=>{
            state.isLoading=true;

        })
        .addCase(CreateOrder.fulfilled,(state,action)=>{
            state.isError=false
            state.isSuccess=true
            state.isLoading=false
            state.message=action.payload.message
            toast.success(action.payload.message)
            console.log(action.payload)
        })
        .addCase(CreateOrder.rejected,(state,action)=>{
            state.isError=true
            state.isSuccess=false
            state.isLoading=false
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })
        //Get All Orders
        .addCase(GetOrders.pending,(state,action)=>{
            state.isLoading=true;

        })
        .addCase(GetOrders.fulfilled,(state,action)=>{
            state.isError=false
            state.isSuccess=true
            state.isLoading=false
            state.message=action.payload.message
            state.orders=action.payload.data
            console.log(action.payload)
        })
        .addCase(GetOrders.rejected,(state,action)=>{
            state.isError=true
            state.isSuccess=false
            state.isLoading=false
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

         //Get Order
         .addCase(GetOrder.pending,(state,action)=>{
            state.isLoading=true;

        })
        .addCase(GetOrder.fulfilled,(state,action)=>{
            state.isError=false
            state.isSuccess=true
            state.isLoading=false
            state.message=action.payload.message
            state.order=action.payload.data
            console.log(action.payload)
        })
        .addCase(GetOrder.rejected,(state,action)=>{
            state.isError=true
            state.isSuccess=false
            state.isLoading=false
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //Update Order Status
        .addCase(updateOrderStatus.pending,(state,action)=>{
            state.isLoading=true;

        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isError=false
            state.isSuccess=true
            state.isLoading=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isError=true
            state.isSuccess=false
            state.isLoading=false
            state.message=action.payload.message
            toast.error(action.payload.message)
        })
  }
});

export const {} = orderSlice.actions

export default orderSlice.reducer