import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../../redux/features/product/productSlice';
import styles from './Product.module.scss'
import ProductFilter from '../../components/shop/productFilter/ProductFilter'
import ProductList from '../../components/shop/productList/ProductList'
import { Spinner } from '../../components/loader/Loader';
import { FaCogs } from 'react-icons/fa';

const Product = () => {
 const [showFilter, setShowFilter] = useState(false)
 const dispatch=useDispatch();
 const {isLoading, products}=useSelector((state)=>state.product);

 useEffect(()=>{
    dispatch(getProducts())
 },[dispatch])

 const toggleFilter=()=>{
    setShowFilter(!showFilter)
 }
  return (
    <section>
        <div className={`container ${styles.product}`}>
            <aside className={showFilter?`${styles.filter} ${styles.show}`:`${styles.filter}`}>
              {isLoading?null:<ProductFilter/>}
            </aside>
            <div className={styles.content}>
                {isLoading?<Spinner/>:<ProductList products={products}/>}
                <div className={styles.icons} onClick={toggleFilter}>
                    <FaCogs size={20} color='orangered'/>
                    <p>
                        <b>{showFilter?"Hide Filter":"Show Filter"}</b>
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Product