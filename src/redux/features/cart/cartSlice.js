import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { shortenText,getQuantityById,getCartQuantityById } from '../../../utils'
import cartService from './cartService';

const FRONTEND_URL=process.env.REACT_APP_FRONTEND_URL;

const initialState = {
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    fixedCartTotalAmount:0,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

//Save User Cart to DataBase
export const saveToCart=createAsyncThunk('user/saveCart',
async(cartItems,thunkAPI)=>{
    try {
        const response=await cartService.saveToCart(cartItems)
        return response;
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)|| error.toString() || error.message;
        return thunkAPI.rejectWithValue(message)
    }
})

//get User Cart from DataBase
export const getCart=createAsyncThunk('user/getCart',
async(_,thunkAPI)=>{
    try {
        const response=await cartService.getCart()
        return response;
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)|| error.toString() || error.message;
        return thunkAPI.rejectWithValue(message)
    }
    
})


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_RESET(state){
        state.isError=false
        state.isSuccess=false
        state.isLoading=false
        state.message=""
        },
    CART_OP(state,action){
        //localStorage.clear();
        const {product,Op}=action.payload
        const productIndex=state.cartItems.findIndex((item)=>item._id===product._id)
        //const cartQuantity=getCartQuantityById(state.cartItems,product._id);
        const cartQuantity=state.cartItems[productIndex]?.cartQuantity;
     
        //Cart Already have same product so increase the count instead of adding it again
        if(productIndex>=0){
            if(cartQuantity===product.quantity && Op==='add'){
                state.cartItems[productIndex].cartQuantity+=0
                toast.info(`Max no of Product Reached`)
            }
            else{
                if(Op==='add'){
                state.cartItems[productIndex].cartQuantity+=1
                toast.success(`${shortenText(product?.name,15)} Increased by 1`,{
                    position:'top-left'
                })
                }
                else{
                if(Op==='sub'){
                    state.cartItems[productIndex].cartQuantity-=1
                    if(state.cartItems[productIndex].cartQuantity===0){
                    state.cartItems.splice(productIndex,1);
                    toast.success(`${shortenText(product?.name,15)} removed from Cart`,{
                        position:'top-left'
                    })}
                }
                if(Op==='clear'){
                    state.cartItems.splice(productIndex,1);
                    toast.success(`${shortenText(product?.name,15)} removed from Cart`,{
                        position:'top-left'
                    })
                }
                else toast.success(`${shortenText(product?.name,15)} Decreased by 1`,{
                    position:'top-left'
                })
                }           
            }
        }
        //Cart Doesn't have item so add the product and increase the count to 1
        else{
            if(Op==='add'){
            const tempProduct={...product,cartQuantity:1}
            state.cartItems.push(tempProduct)
            toast.success(`${shortenText(product?.name,15)} added to Cart`,{
                position:'top-left'
            })
        }
        }
        //Save to localStorage
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    REMOVE_ALL(state,action){
          //Clear All cart Items
            state.cartItems=[];
            toast.success("Removed all Products",{
                position:'top-left'
        })
    },
    CART_TOTAL_QUANTITY_PRICE(state,action){
       let totalQty=0,totalPr=0;
       let {value}=action.payload
       if(value==='add'){
        state.cartItems.map((item)=>{
        const {cartQuantity,price}=item
        totalQty+=Number(cartQuantity);
        totalPr+=Number(cartQuantity*price);
        })
       }
       state.cartTotalAmount=totalPr;
       state.cartTotalQuantity=totalQty;    
  }
},
  extraReducers:(builder)=>{
    builder
    //Save to Cart
        .addCase(saveToCart.pending,(state)=>{
            state.isLoading=true;
            })
        .addCase(saveToCart.fulfilled,(state,action)=>{
            state.isError=false;
            state.isSuccess=true;
            state.isLoading=false;
            state.message=action.payload.message
            })
        .addCase(saveToCart.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.isLoading=false;
            state.message=action.payload.message
            })
        //get From Cart
        .addCase(getCart.pending,(state)=>{
            state.isLoading=true;
            })
        .addCase(getCart.fulfilled,(state,action)=>{
            state.isError=false;
            state.isSuccess=true;
            state.isLoading=false;
            state.message=action.payload.message
            const {data}=action.payload;
            localStorage.setItem('cartItems',JSON.stringify(data));
            if(data.length>0){
               window.location.href=FRONTEND_URL+'/cart' 
            }
            else{
               window.location.href=FRONTEND_URL
            }
            })
        .addCase(getCart.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.isLoading=false;
            state.message=action.payload.message
            })
  }
});

export const {CART_RESET,CART_OP,REMOVE_ALL,CART_TOTAL_QUANTITY_PRICE} = cartSlice.actions

export default cartSlice.reducer