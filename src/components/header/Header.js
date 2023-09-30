import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {FaShoppingCart, FaUserCircle} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import {FaTimes} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_RESET, logout } from '../../redux/features/auth/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../hiddenLink/hiddenLink'
import { UserName } from '../../pages/profile/Profile'
import { AdminOnlyLink } from '../hiddenLink/AdminOnlyRoutes'


/*Creating Header Logo so that we can use it everywhere */
export const logo=(
    <div className={styles.logo}>
        <Link to='/'>
            <h2>
                Ecommer<span>CE</span>
            </h2>
        </Link>
    </div>
)

/*Function to check currently on which link user has clicked */
const activeLink=({isActive})=>(isActive ? (`${styles.active}`):'null');

const Header = () => {
const [showMenu, setShowMenu]=useState(false);
const [scroll, setScroll] = useState(false)/* Var To Make Header Sticky */

const dispatch=useDispatch();
const navigate=useNavigate();
const {isLoggedIn,isSuccess,isLoading}=useSelector((state)=>state.auth)


//Fix or Stick Header
const fixHeader=()=>{
    if(window.scrollY>50){
        setScroll(true)
    }
    else{//This was an issue but somehow resolved if you can't put else condition then everything will go inside header
        setScroll(false)
    }
}
window.addEventListener('scroll',fixHeader)/*Keep on checking of Vertical scroll of window*/

const toggleMenu=()=>{
    setShowMenu(!showMenu);
}
const hideMenu=()=>{
    setShowMenu(false);
}

/*Cart Logo and functionality */
const cart=(
    <span className={styles.cart}>
        <Link to='/cart'>
            Cart
            <FaShoppingCart size={20}/>
            <p>0</p>
        </Link>
    </span>
)

//Logout User concept
const logoutUser=async()=>{
    await dispatch(logout());
    await dispatch(AUTH_RESET())
    navigate("/login")
}

  return (
    <header className={scroll?(`${styles.fixed}`):null}>{/*To make header sticky */}
    <div className={styles.header}>
        {logo}
    <nav className={showMenu? `${styles['show-nav']}` :`${styles['hide-nav']}`}>{/*Logic to Responsive Menu */}
        <div className={showMenu? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` :`${styles['nav-wrapper']}`}
        onClick={hideMenu}>
        </div>
    <ul>
        <li className={styles['logo-mobile']}>
            {logo}
            <FaTimes size={20} onClick={hideMenu}/>
        </li>
        <li>
            <NavLink to='/shop' className={activeLink}>
                Shop Now
            </NavLink>
        </li>
        <li>
            <AdminOnlyLink>
            <NavLink to='/admin/home' className={activeLink}>
               | Admin
            </NavLink>
            </AdminOnlyLink>
        </li>
    </ul>

    <div className={styles['header-right']}>
        <span className={styles.links}>
            <ShowOnLogin>
            <Link to='/profile'>
                <FaUserCircle size={16} color='#ff7722'/>
                <UserName/>
            </Link>
            </ShowOnLogin>
            <ShowOnLogout>
            <NavLink to='/login' className={activeLink}>
                Login
            </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
            <Link to='/' className={activeLink} onClick={logoutUser}>
                Logout
            </Link>
            </ShowOnLogin>
            <ShowOnLogout>
            <NavLink to='/register' className={activeLink}>
                Register
            </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
            <NavLink to='/order-history' className={activeLink}>
                My Order
            </NavLink>
            </ShowOnLogin>
        </span>
        {cart}
    </div>
    </nav>
    <div className={styles['menu-icon']}>
        {cart}
        <HiOutlineMenuAlt3 size={20} onClick={toggleMenu}/>
    </div>
    </div>
    </header>
  );
}

export default Header;
