import React, { useState } from 'react'
import styles from './Header.module.scss'
import {Link, NavLink} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import {FaTimes} from 'react-icons/fa'

export const logo=(
    <div className={styles.logo}>
        <Link to='/'>
            <h2>
                Ecommer<span>CE</span>
            </h2>
        </Link>
    </div>
)

const activeLink=({isActive})=>(isActive ? (`${styles.active}`):'null');

const Header = () => {
const [showMenu, setShowMenu]=useState(false);
const [scroll, setScroll] = useState(false)


//Fix or Stick Header
const fixHeader=()=>{
    if(window.scrollY>50){
        setScroll(true)
    }
}
window.addEventListener('scroll',fixHeader)

const toggleManu=()=>{
    setShowMenu(!showMenu);
}
const hideMenu=()=>{
    setShowMenu(false);
}
const cart=(
    <span className={styles.cart}>
        <Link to='/cart'>
            Cart
            <FaShoppingCart size={20}/>
            <p>0</p>
        </Link>
    </span>
)
  return (
    <header className={scroll?(`${styles.fixed}`):null}>
    <div className={styles.header}>
        {logo}
    <nav className={showMenu? `${styles['show-nav']}` :`${styles['hide-nav']}`}>
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
    </ul>

    <div className={styles['header-right']}>
        <span className={styles.links}>
            <NavLink to='/login' className={activeLink}>
                Login
            </NavLink>
            <NavLink to='/register' className={activeLink}>
                Register
            </NavLink>
            <NavLink to='/order-history' className={activeLink}>
                My Order
            </NavLink>
        </span>
        {cart}
    </div>
    </nav>
    <div className={styles['menu-icon']}>
        {cart}
        <HiOutlineMenuAlt3 size={20} onClick={toggleManu}/>
    </div>
    </div>
    </header>
  );
}

export default Header;
