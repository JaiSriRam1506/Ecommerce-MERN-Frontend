import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_RESET, getProduct, selectProduct, updateProduct } from '../../../redux/features/product/productSlice';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
import ProductForm from '../productForm/ProductForm';
import { getBrands, getCategories } from '../../../redux/features/category-brand/CatBrandSlice';

const EditProduct = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [description,setDescription]=useState("")
  const EditProduct=useSelector(selectProduct)
  const [product,setProduct]=useState(EditProduct)

  const {isLoading,message}=useSelector((state)=>state.product)
  const [files,setFiles]=useState([]);  

  //First Get Product details
  useEffect(()=>{
    dispatch(getProduct(id))
  },[dispatch,id])

  //Then set Product details to product var as dependency EditProduct
  useEffect(()=>{
   setProduct(EditProduct);
   setDescription(EditProduct && EditProduct.description?EditProduct.description:'');
   if(EditProduct && EditProduct.image)setFiles(EditProduct?.image)

  },[dispatch,EditProduct])
  

  const saveProduct=async(e)=>{
    e.preventDefault();

    if(files.length<1){
      toast.error('Pleas add an image')
    }
    const formData={
      name:product?.name,
      category:product?.category,
      brand:product?.brand,
      quantity:Number(product?.quantity),
      price:product?.price,
      regularPrice:product?.regularPrice,
      color:product?.color,
      description,
      images:files
    }
    await dispatch(updateProduct({id,formData}))
  }
  useEffect(()=>{
    if(message==='Product updated Successfully'){
      navigate('/admin/all-products')
    }
    dispatch(PRODUCT_RESET())
  },[message,dispatch,navigate])

  return (
    <section>
      {isLoading && <Loader/>}
      <div className='container'>
      <h3 className='--mt'>Update Product</h3>
      <ProductForm saveProduct={saveProduct} 
      product={product} 
      setProduct={setProduct}
      isEditing={true}
      description={description}
      setDescription={setDescription}
      files={files}
      setFiles={setFiles}
      />
    </div>
  </section>
  )
}

export default EditProduct;