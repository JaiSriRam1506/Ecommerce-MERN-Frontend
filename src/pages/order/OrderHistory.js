import React, { useEffect } from 'react'
import {useDispatch,} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './OrderHistory.scss'
import { GetOrders } from '../../redux/features/order/orderSlice'
import OrderList from '../../components/orderList/OrderList'

const OrderHistory = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  useEffect(()=>{
    dispatch(GetOrders())
  },[dispatch])

  const orderDetailsId=(id)=>{
    navigate(`/order-details/${id}`)
  }

  return (
    <section>
      <div className='container order'>
        <h2>Your Order History</h2>
        <p>Open a order to leave <b>Product Review</b></p>
        <br/>
        <div className='table'>
          <OrderList orderDetailsId={orderDetailsId}/>
        </div>
      </div>
    </section>
  )
}

export default OrderHistory