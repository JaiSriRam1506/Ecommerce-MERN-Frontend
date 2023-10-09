import React, { useState } from 'react'
import styles from './ChangeOrderStatus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../loader/Loader'
import Card from '../../card/Card'
import { GetOrder, updateOrderStatus } from '../../../redux/features/order/orderSlice'
import { useParams } from 'react-router-dom'

const ChangeOrderStatus = () => {
    const [status, setStatus] = useState("")
    const {id}=useParams()
    const {isLoading}=useSelector((state)=>state.order)
    const dispatch=useDispatch()
    
    const updateStatus=async(e)=>{
        e.preventDefault();
        const formData={
            status:status
        }
        console.log(status,id,formData)
        await dispatch(updateOrderStatus({id,formData}))
        await dispatch(GetOrder(id))
    }
  return (
    <>
    {isLoading && <Spinner/>}
    <div className={styles.status}>
        <Card cardClass={styles.card}>
        <h3>Update Status</h3>
        <form onSubmit={updateStatus}>
            <span>
                <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option>---Choose One---</option>
                    <option value='Order Placed...'>Order Placed...</option>
                    <option value='Processing...'>Processing...</option>
                    <option value='Shipped...'>Shipped...</option>
                    <option value='Delivered'>Delivered</option>
                </select>
            </span>
            <span>
                <button type='submit' className='--btn --btn-primary'>Update Order Status</button>
            </span>
        </form>
        </Card>
    </div>
    </>
  )
}

export default ChangeOrderStatus