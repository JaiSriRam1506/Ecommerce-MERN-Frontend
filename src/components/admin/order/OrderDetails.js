import React, { useEffect } from 'react'
import OrderDetailsComp from '../../../pages/order/OrderDetailsComp'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { GetOrder } from '../../../redux/features/order/orderSlice';
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus';

const OrderDetails = () => {
  const dispatch=useDispatch();
  const {id}=useParams()

  useEffect(()=>{
    dispatch(GetOrder(id))
  },[dispatch,id])

  return (
    <>
    <OrderDetailsComp orderPageLink={"/admin/orders"}/>
    <ChangeOrderStatus/>
    </>
  )
}

export default OrderDetails