import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt} from 'react-icons/fa'
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import {useDispatch,useSelector} from 'react-redux'
import ReactPaginate from 'react-paginate';
import { FILTER_BY_SEARCH, SORT_PRODUCT, selectFilteredProducts } from '../../../redux/features/product/filterSlice'

const ProductList = ({products}) => {
  const [gridView, setGridView] = useState(true);
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState('latest')


  const dispatch=useDispatch();
  const filteredProduct=useSelector(selectFilteredProducts)

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[dispatch,search,products])

  useEffect(()=>{
    dispatch(SORT_PRODUCT({products,sort}))
  },[dispatch,sort,products])

  // Start Paginate 
const itemsPerPage=3;
const [itemOffset, setItemOffset] = useState(0);
const endOffset = itemOffset + itemsPerPage;
const currentItems = products?.slice(itemOffset, endOffset);
const pageCount = Math.ceil(products?.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % products?.length;
  setItemOffset(newOffset);
};

//End Paginate

  return (
    <div className={styles['product-list']}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='orangered' onClick={()=>setGridView(true)}/>
          <FaListAlt size={24} color='#0066d4' onClick={()=>setGridView(false)}/>
          <p>{currentItems.length} Products found</p>
        </div>
        <div>
          <Search  value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className={styles.sort}>
          <label>Sort By:</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A-Z</option>
            <option value='z-a'>Z-A</option>
          </select>
        </div>
      </div>
      <div className={gridView? `${styles.grid}`:`${styles.list}`}>
        {products.length===0?(<p>No Products found</p>):(
          <>
          {currentItems.map((product)=>{
            return (
              <div key={product._id}>
                <ProductItem {...product} grid={gridView} product={product}/>
              </div>
            )
          })}
          </>
        )}
      </div>
      <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </div>
  )
}

export default ProductList