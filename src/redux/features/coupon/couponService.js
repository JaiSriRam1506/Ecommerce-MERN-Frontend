import axios  from 'axios';

//Create Category
const createCoupon=async (formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.post(API_URL+'coupon/createCoupon',formData)
    return response.data;
}

//getCoupons
const getCoupons=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'coupon/getCoupons')
    return response.data;
}

//getCoupon
const getCoupon=async (coupon)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    console.log(coupon,API_URL+'coupon/getCoupon/')
    const response= await axios.get(API_URL+'coupon/getCoupon/'+coupon)
    return response.data;
}

//Delete Coupon
const deleteCoupon=async (id)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.delete(API_URL+'coupon/deleteCoupon/'+id)
    return response.data;
}

const CouponService={
    createCoupon,
    getCoupons,
    getCoupon,
    deleteCoupon
}
export default CouponService;