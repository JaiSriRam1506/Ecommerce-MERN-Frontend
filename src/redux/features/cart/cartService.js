import axios from 'axios'


const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
const API_URL=`${BACKEND_URL}/api/v1/`

const saveToCart=async(cartItems)=>{
    const response= await axios.patch(API_URL+'user/saveCart',cartItems);
    return response.data;
}

const getCart=async()=>{
    const response= await axios.get(API_URL+'user/getCart');
    return response.data;
}

const cartService={
    saveToCart,
    getCart
}

export default cartService;