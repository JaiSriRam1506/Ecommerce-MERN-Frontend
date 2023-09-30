import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import ProductForm from '../productForm/ProductForm';
import './AddProduct.scss'
import { PRODUCT_RESET, createProduct } from '../../../redux/features/product/productSlice';


let initialState={
  name:'',
  category:'',
  brand:'',
  quantity:'',
  price:'',
  regularPrice:'',
  color:'',
  image:[]
}

const AddProduct = () => {
  const [description,setDescription]=useState("")
  const [product,setProduct]=useState(initialState)
  const {name,category,brand,quantity,price,regularPrice,color}=product;
  const {isLoading,message}=useSelector((state)=>state.product)
  const [files,setFiles]=useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  

  const generateSKU=()=>{
        const t1=category.slice(0,3).toUpperCase();
        const t2=brand.slice(0,2).toUpperCase();
        const date=Date.now();
        return t1+t2+"-"+date;
  }
  const saveProduct=async(e)=>{
    e.preventDefault();

    if(files.length<1){
      toast.error('Pleas add an image')
    }
    const formData={
      name,
      sku:generateSKU(),
      category,
      brand,
      quantity:Number(quantity),
      price,
      regularPrice,
      color,
      description,
      image:files
    }
    await dispatch(createProduct(formData))
  }
  useEffect(()=>{
    if(message==='Product Created Successfully'){
      navigate('/admin/all-products')
    }
    dispatch(PRODUCT_RESET())
  },[message,dispatch,navigate])


  return (
    <section>
      <div className='container'>
      {isLoading && <Loader/>}
        <h3 className='--mt'>Add New Product</h3>

        <ProductForm saveProduct={saveProduct} 
        product={product} 
        setProduct={setProduct}
        isEditing={false}
        description={description}
        setDescription={setDescription}
        files={files}
        setFiles={setFiles}
        />
      </div>
    </section>
  )
}

export default AddProduct