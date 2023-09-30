import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCoupon, getCoupons } from '../../../redux/features/coupon/couponSlice'
import {FaTrashAlt} from 'react-icons/fa'
import './Coupon.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Loader from '../../loader/Loader.js'

const CouponList = () => {
    const {coupons,isLoading}=useSelector((state)=>state.coupon)
    const dispatch=useDispatch()
  
    useEffect(()=>{
      dispatch(getCoupons());
    },
    [dispatch])
  
    const confirmDelete=(slug)=>{
      confirmAlert({
        title: 'Delete a Coupon',
        message: 'Are you sure to delete this coupon.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteCoup(slug)
          },
          {
            label: 'No',
          }
        ]
      });
    };
  
    const deleteCoup=async(id)=>{
      await dispatch(deleteCoupon(id))
      dispatch(getCoupons())
    }
  
    return (
      <div className='--mb2'>
        {isLoading && <Loader/>}
        <h3>All Coupons</h3>
        <div className='table'>
          {coupons?.length===0?(<p>No Coupons Found</p>):(
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Discount(%)</th>
                  <th>Date Created</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons?.map((cp,index)=>{
                  const {_id,name,discount,expiresAt,createdAt}=cp;
                  return (
                    <tr key={_id}>
                      <td>{index+1}</td>
                      <td>{name}</td>
                      <td>{discount}</td>
                      <td>{createdAt.substring(0,10)}</td>
                      <td>{expiresAt.substring(0,10)}</td>
                      <td>
                        <span>
                          <FaTrashAlt size={20} color={'red'} onClick={()=>confirmDelete(_id)}/>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
}

export default CouponList