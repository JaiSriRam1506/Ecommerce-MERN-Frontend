import React from 'react'
import OrderList from '../../orderList/OrderList'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const navigate=useNavigate();

  const orderDetailsId=(id)=>{
    navigate(`/admin/order-details/${id}`)
  }

  return (
    <div className='container order'>
      <h2>All Orders</h2>
      <p>
        Open an order to <b>Change the Status.</b>
      </p>
      <br/>
      <div className='table'>
          <OrderList orderDetailsId={orderDetailsId}/>
      </div>
    </div>
  )
}

export default Orders