import React, { useEffect } from 'react'
import CreateCoupon from './CreateCoupon'
import CouponList from './CouponList'
import "./Coupon"
import { useDispatch } from 'react-redux'
import { getCoupons } from '../../../redux/features/coupon/couponSlice'

const Coupon = () => {
    // const dispatch=useDispatch()
    // useEffect(()=>{
    //     dispatch(getCoupons())
    // },[])
    return (
        <section>
            <div className='container'>
                <CreateCoupon/>
                <CouponList/>
            </div>
        </section>
      )
}

export default Coupon