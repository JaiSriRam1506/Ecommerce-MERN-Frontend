import React from 'react'
import styles from './Admin.module.scss'
import Navbar from '../../components/admin/navBar/Navbar'
import AdminHome from '../../components/admin/adminHome/AdminHome'
import { Route, Routes } from 'react-router-dom'
import Category from '../../components/admin/category/Category'
import Brand from '../../components/admin/brand/Brand'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import ViewProduct from '../../components/admin/viewProducts/ViewProducts'
import EditProduct from '../../components/admin/editProduct/EditProduct'
import Coupon from '../../components/admin/coupon/Coupon'
import PageNotFound from '../404/PageNotFound'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<AdminHome/>}/>
          <Route path='category' element={<Category/>}/>
          <Route path='brand' element={<Brand/>}/>

          <Route path='add-product' element={<AddProduct/>}/>
          <Route path='coupon' element={<Coupon/>}/>
          
          <Route path='all-products' element={<ViewProduct/>}/>
          <Route path='edit-product/:id' element={<EditProduct/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin