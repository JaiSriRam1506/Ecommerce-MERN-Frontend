import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteProduct, getProducts} from '../../../redux/features/product/productSlice'
import {userIsLoggedIn} from '../../../redux/features/auth/authSlice'
import Search from '../../search/Search'
import {Spinner} from '../../loader/Loader'
import {AiOutlineEye} from 'react-icons/ai'
import {FaEdit,FaTrashAlt} from 'react-icons/fa'
import ReactPaginate from 'react-paginate';
import {shortenText} from '../../../utils/index'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link, json} from 'react-router-dom'

const ViewProducts = () => {
const dispatch=useDispatch();
const isLoggedIn=useSelector(userIsLoggedIn);
const {products,isLoading}=useSelector((state)=>state.product);
const [filteredProduct, setFilteredProduct] = useState(null)
const [search, setSearch] = useState('')

  useEffect(()=>{
    if(isLoggedIn){
      dispatch(getProducts())
    }
  },[isLoggedIn,dispatch])
  
  useEffect(()=>{
   setFilteredProduct(products)
  },[products,dispatch])

  useEffect(()=>{
    
  },[search,dispatch])

  const confirmDelete=(id)=>{
    confirmAlert({
      title: 'Delete a Brand',
      message: 'Are you sure to delete this brand.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => delProduct(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const delProduct=async(id)=>{
    await dispatch(deleteProduct(id));
    await dispatch(getProducts())
  }

//Paginate 
  const itemsPerPage=10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProduct?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProduct?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProduct?.length;
    setItemOffset(newOffset);
  };


  return (
    <section>
      <div className='container product-list'>
        <div className='table'>
          <div className='--flex-between --flex-dir-column'>
          <span>
          <h3>All Products</h3>
          <p>
            ~ <b>{products?.length}</b> Products found
          </p>
          </span>
          <span> <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
          </span>
          </div>
        </div>
        {isLoading && <Spinner/>}
        <div className='table'>
        {!isLoading && products.length===0?(<p>---No Products Found--</p>):(
          <table>
            <thead>
              <tr>
                <td>s/n</td>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Value</td>
                <td>action</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product,index)=>{
                const {_id,name,category,price,quantity}=product;
                return(
                  <tr>
                    <td>{index+1}</td>
                    <td>{shortenText(name,28)}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{price*quantity}</td>
                    <td className='icons'>
                      <span>
                        <Link to='/'>
                          <AiOutlineEye size={25} color='purple'/>
                        </Link>
                        </span>
                      <span>
                        <Link to={`/admin/edit-product/${_id}`}>
                          <FaEdit size={20} color='green'/>
                        </Link>
                        </span>
                      <span>
                        <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(_id)}/>
                      </span>
                    </td>
                  </tr>
              )})}
            </tbody>
          </table>
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
    </section>
  )
}

export default ViewProducts