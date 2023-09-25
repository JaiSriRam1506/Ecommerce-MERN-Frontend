import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CatBrandService from './CatBrandService';
import {toast} from 'react-toastify'

const initialState = {
    categories:[],
    brands:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

//Create New Category
export const createCategory=createAsyncThunk('category/createCategory',
    async(formData,thunkAPI)=>{
        try {
            return await CatBrandService.createCategory(formData);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get all Categories
export const getCategories=createAsyncThunk('category/getCategories',
    async(_,thunkAPI)=>{
        try {
            return await CatBrandService.getCategories();
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete a Category
export const deleteCategory=createAsyncThunk('category/deleteCategory',
    async(slug,thunkAPI)=>{
        try {
            return await CatBrandService.deleteCategory(slug);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

/*--------------------------------------------------------------------------------------------------------------*/

//Create New Category
export const createBrand=createAsyncThunk('brand/createBrand',
    async(formData,thunkAPI)=>{
        try {
            return await CatBrandService.createBrand(formData);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get all Categories
export const getBrands=createAsyncThunk('brand/getBrands',
    async(_,thunkAPI)=>{
        try {
            return await CatBrandService.getBrands();
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete a Category
export const deleteBrand=createAsyncThunk('brand/deleteBrand',
    async(slug,thunkAPI)=>{
        try {
            return await CatBrandService.deleteBrand(slug);
        } catch (error) {
            const message=(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


/*--------------------------------------------------------------------------------------------------------------*/

const CatBrandSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    CAT_RESET(state){
    state.isError=false
    state.isSuccess=false
    state.isLoading=false
    state.message=""
    }
  },
  extraReducers:(builder)=>{
    builder
            //Create Category
            .addCase(createCategory.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(createCategory.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              toast.success(action.payload.message);
            })
            .addCase(createCategory.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
            })

            //Get all Categories
            .addCase(getCategories.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.categories=action.payload.data;
              //console.log(action.payload);
              //toast.success(action.payload.message);
            })
            .addCase(getCategories.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              //console.log(action.payload);
              toast.error(action.payload.message);
            })
            //Delete a Category
            .addCase(deleteCategory.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              //console.log(action.payload);
              toast.success(action.payload.message);
            })
            .addCase(deleteCategory.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              //console.log(action.payload);
              toast.error(action.payload.message);
            })

            /*-----------------------------------------------------------------------------------------*/

            //Create Brands
            .addCase(createBrand.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(createBrand.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              toast.success(action.payload.message);
            })
            .addCase(createBrand.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              toast.error(action.payload);
            })

            //Get all Brands
            .addCase(getBrands.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(getBrands.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              state.brands=action.payload.data;
              //console.log(action.payload);
              //toast.success(action.payload.message);
            })
            .addCase(getBrands.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              //console.log(action.payload);
              toast.error(action.payload.message);
            })
            //Delete a Brand
            .addCase(deleteBrand.pending,(state)=>{
              state.isLoading=true
            })
            .addCase(deleteBrand.fulfilled,(state,action)=>{
              state.isError=false
              state.isSuccess=true
              state.isLoading=false
              state.message=action.payload.message
              //console.log(action.payload);
              toast.success(action.payload.message);
            })
            .addCase(deleteBrand.rejected,(state,action)=>{
              state.isError=true
              state.isSuccess=false
              state.isLoading=false
              state.message=action.payload
              //console.log(action.payload);
              toast.error(action.payload.message);
            })
  }
});

export const {CAT_RESET} = CatBrandSlice.actions

export default CatBrandSlice.reducer