import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProductService from './productService';
import {toast} from 'react-toastify'

const initialState = {
    product:null,
    products:[],
    maxPrice:null,
    minPrice:null,
    category:[],
    outOfStock:0,
    totalStoreValue:0,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

//Create New Product
export const createProduct=createAsyncThunk('product/createProduct',
    async(formData,thunkAPI)=>{
        try {
            return await ProductService.createProduct(formData);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//Get Products
export const getProducts=createAsyncThunk('product/getProducts',
    async(_,thunkAPI)=>{
        try {
            return await ProductService.getProducts();
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Product
export const getProduct=createAsyncThunk('product/getProduct',
    async(id,thunkAPI)=>{
        try {
            return await ProductService.getProduct(id);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//Delete Product
export const deleteProduct=createAsyncThunk('product/deleteProduct',
    async(id,thunkAPI)=>{
        try {
            return await ProductService.deleteProduct(id);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)



//Update Product
export const updateProduct=createAsyncThunk('product/updateProduct',
    async({id,formData},thunkAPI)=>{
        try {
            return await ProductService.updateProduct(id,formData);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
/*--------------------------------------------------------------------------------------------------------------*/

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    PRODUCT_RESET(state){
    state.isError=false
    state.isSuccess=false
    state.isLoading=false
    state.message=""
    },
    GET_PRICE_RANGE(state,action){
      const {products}=action.payload;
      const tempArray=[]
      products.map((product)=>{
        tempArray.push(product.price);
      })
      state.maxPrice=Math.max(...tempArray);
      state.minPrice=Math.min(...tempArray);
    }
  },
  extraReducers:(builder)=>{
    builder
            //Create Product
            .addCase(createProduct.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              toast.success(action.payload.message);
              //console.log(action.payload)
            })
            .addCase(createProduct.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
              //console.log(action.payload)
            })

            
            //Get Products
            .addCase(getProducts.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.products=action.payload.data
              //toast.success(action.payload.message);
              //console.log(action.payload)
            })
            .addCase(getProducts.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
              //console.log(action.payload)
            })

             //Get Product
             .addCase(getProduct.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getProduct.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.product=action.payload.data
              //toast.success(action.payload.message);
              //console.log(action.payload)
            })
            .addCase(getProduct.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
              //console.log(action.payload)
            })


             //Delete Products
             .addCase(deleteProduct.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              toast.success(action.payload.message);
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
            })
            
            //Update Product
            .addCase(updateProduct.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              toast.success(action.payload.message);
              // console.log(action.payload)
            })
            .addCase(updateProduct.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
              // console.log(action.payload)
            })
  }
});

export const {PRODUCT_RESET,GET_PRICE_RANGE} = ProductSlice.actions

export default ProductSlice.reducer;
export const selectProduct=(state)=>state.product.product;
export const isLoading=(state)=>state.product.isLoading;
export const message=(state)=>state.product.message;