import React, { useEffect, useState } from 'react'
import './ProductFilter.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductFilter.module.scss'
import { FILTER_BY_BRANDS, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/features/product/filterSlice'
import { GET_PRICE_RANGE } from '../../../redux/features/product/productSlice'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


const ProductFilter = () => {
  const {minPrice,maxPrice,products}=useSelector((state)=>state.product);
  const [category, setCategory] = useState("All");
  const allCategory=['All',...new Set(products.map((product)=>product?.category))]
  const [brand, setBrand] = useState("All");
  const allBrands=['All',...new Set(products.map((product)=>product?.brand))]
  const [price, setPrice] = useState([50,1500])

  const dispatch=useDispatch();

  const filterProductCategory=(cat)=>{
        setCategory(cat)
        dispatch(FILTER_BY_CATEGORY({category:cat,products:products}))
  }

useEffect(()=>{
  dispatch(FILTER_BY_BRANDS({brand,products}))
},[dispatch,brand,products])

useEffect(()=>{
  dispatch(FILTER_BY_PRICE({price,products}))
},[dispatch,price,products])


useEffect(()=>{
  dispatch(GET_PRICE_RANGE({products}))
},[dispatch,products])

const clearFilter=()=>{
  setCategory('All')
  setBrand('All')
  setPrice([minPrice,maxPrice])
}
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategory.map((cat,index)=>{
          return(
            <button key={index} type='button' className={`${category}`===cat?`${styles.active}`:null}
            onClick={()=>filterProductCategory(cat)} >&#8250;{cat}</button>
          )
        })}
      </div>
      <h4>Brands</h4>
      <div className={styles.brand}>
      <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
        {allBrands.map((brd,index)=>{
          return(
              <option key={index} value={brd}>{brd}</option>
          )
        })}
      </select>
      </div>
      <h4>Price</h4>
      <div className={styles.price}>
      <Slider
            range
            marks={{
              1: `${price[0]}`,
              1000: `${price[1]}`,
            }}
            min={minPrice}
            max={maxPrice}
            defaultValue={[minPrice, maxPrice]}
            tipFormatter={(value) => `$${value}`}
            tipProps={{
              placement: "top",
              visible: true,
            }}
            value={price}
            onChange={(price) => setPrice(price)}
          />
      </div>
      <br/>
      <br/>
      <button className="--btn --btn-danger" onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default ProductFilter