import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetOrder } from '../../redux/features/order/orderSlice';
import { useParams } from 'react-router-dom';
import OrderDetailsComp from './OrderDetailsComp';

const OrderDetails = () => {
  const dispatch=useDispatch();
  const {id}=useParams()

  useEffect(()=>{
    dispatch(GetOrder(id))
  },[dispatch,id])

  return (
    <section>
      <OrderDetailsComp orderPageLink={"/order-history"}/>
    </section>
  )
}

export default OrderDetails