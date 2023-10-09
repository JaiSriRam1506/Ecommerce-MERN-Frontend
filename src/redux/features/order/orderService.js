import axios  from 'axios';

//Create Order
const createOrder=async (formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.post(API_URL+'order/createOrder/',formData)
    return response.data;
}

//Get All Orders
const getOrders=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'order/getOrders/')
    return response.data;
}

//Get Order By ID
const getOrder=async (id)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'order/getOrder/'+id)
    return response.data;
}

//Update Order Status
const updateOrderStatus=async (id,formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.patch(API_URL+'order/updateStatus/'+id,formData)
    return response.data;
}

const OrderService={
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
}
export default OrderService