import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBrand, deleteBrands, getBrands } from '../../../redux/features/category-brand/CatBrandSlice'
import {FaTrashAlt} from 'react-icons/fa'
import './Brand.scss'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const BrandList = () => {
  const {brands}=useSelector((state)=>state.category)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getBrands());
  },
  [dispatch])

  const confirmDelete=(slug)=>{
    confirmAlert({
      title: 'Delete a Brand',
      message: 'Are you sure to delete this brand.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteBra(slug)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const deleteBra=(slug)=>{
    dispatch(deleteBrand(slug))
    dispatch(getBrands())
  }

  return (
    <div className='--mb2'>
      <h3>All Brands</h3>
      <div className='table'>
        {brands.length===0?(<p>No Brand Found</p>):(
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action No</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brd,index)=>{
                const {_id,name,category,slug}=brd;
                return (
                  <tr key={_id}>
                    <td>{index+1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>
                      <span>
                        <FaTrashAlt size={20} color={'red'} onClick={()=>confirmDelete(slug)}/>
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

export default BrandList