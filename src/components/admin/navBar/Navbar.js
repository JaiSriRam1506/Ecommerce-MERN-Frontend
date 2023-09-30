import React from 'react'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../redux/features/auth/authSlice'
import styles from './Navbar.module.scss'
import {FaUserCircle} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

function Navbar() {
  const user=useSelector(selectUser);
  const activeLink=({isActive})=>(isActive ? (`${styles.active}`):'null');
  const userName=user?.name;
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color='#fff'/>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/admin/all-products' className={activeLink}>All Products</NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-product' className={activeLink}>Add Product</NavLink>
          </li>

          <li>
            <NavLink to='/admin/coupon' className={activeLink}>Coupon</NavLink>
          </li>
          <li>
            <NavLink to='/admin/category' className={activeLink}>Category</NavLink>
          </li>
          <li>
            <NavLink to='/admin/brand' className={activeLink}>Brand</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar