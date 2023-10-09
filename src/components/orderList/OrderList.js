import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { GetOrders } from '../../redux/features/order/orderSlice'
import Loader from '../loader/Loader'

const OrderList = ({orderDetailsId}) => {
  const dispatch=useDispatch();
  const {orders,isLoading,}=useSelector((state)=>state.order)
  
  useEffect(()=>{
    dispatch(GetOrders())
  },[dispatch])

//   const orderDetailsId=(id)=>{
//     navigate(`/order-details/${id}`)
//   }

  return (
        <>
        {isLoading?(<Loader/>):(
          orders.length===0?(<p>No Order History Found</p>):(
            <table>
              <thead>
                <tr>
                  <td>s/n</td>
                  <td>Order Id</td>
                  <td>Purchase Date</td>
                  <td>Order Amount</td>
                  <td>Payment</td>
                  <td>Order Status</td>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order,index)=>{
                  const {_id,orderDate,orderTime,orderAmount,paymentMethod,orderStatus}=order
                  return(
                    <tr key={_id} onClick={()=>orderDetailsId(_id)}>
                      <td>{index+1}</td>
                      <td>{_id.toString()}</td>
                      <td>{orderDate} at {orderTime}</td>
                      <td>Rs {orderAmount.toFixed(2)}</td>
                      <td>{paymentMethod}</td>
                      <td>
                        <p className={orderStatus!=='Delivered'?'pending':'delivered'}>
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        )}
        </>
  )
}

export default OrderList;