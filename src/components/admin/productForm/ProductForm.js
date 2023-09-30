import React, { useEffect, useState } from 'react'
import './ProductForm.scss'
import Card from '../../card/Card'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadWidget from './UploadWidget';
import {BsTrash} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import { getBrands, getCategories } from '../../../redux/features/category-brand/CatBrandSlice';


const ProductForm = ({saveProduct,product,setProduct,isEditing,
description,setDescription,files,setFiles}) => {

const [filteredBrand,setFilteredBrand]=useState(null);
const {categories,brands}=useSelector((state)=>state.category)
const dispatch=useDispatch();

const filterBrand=(selectedCategory)=>{
    const newBrand=brands.filter((brand)=>brand.category===selectedCategory);
    setFilteredBrand(newBrand);
}

useEffect(()=>{
  filterBrand(product?.category);
},[product?.category])

useEffect(()=>{
  dispatch(getCategories())
  dispatch(getBrands())
},[dispatch])

const handleInputChange=(e)=>{
  e.preventDefault();
  const {name,value}=e.target
  setProduct({...product,[name]:value})
}

  const removeImage=(image)=>{
      setFiles(files.filter((img,index)=>img!==image))
      //Also From Cloud you need to remove the image
  }
  return (
    <div className='add-product'>
      <UploadWidget files={files} setFiles={setFiles}/>
      <Card className='card'>
        <br/>
        <form onSubmit={saveProduct}>
          <label>Product Images:</label>
          <div className='slide-container'>
            <aside>
          {files.length>0 && (
              files.map((image)=>(
                <div key ={image} className='thumbnail'>
                  <img src={image} alt='thumbImage' height={100}/>
                  <div>
                  <BsTrash size={25} className='thumbnailIcon' onClick={()=>removeImage(image)}/>
                  </div>
                </div>
              ))
          )}
          {files.length<1 && (<p className='--m'>
                No Image set for this product.
          </p>)}
           </aside>
          </div>
          <label>Product Name:</label>
          <input type='text' name='name' value={product?.name} placeholder='Product Name' onChange={handleInputChange} required/>
          <label>Product Category:</label>
          <select name='category' value={product?.category} onChange={handleInputChange}>
              {isEditing?(<option value={product?.category}>{product?.category}</option>):
              (<option>Select category</option>)}
              {
                categories.length>0 && categories.map((cat)=>(
                  <option key={cat?._id} value={cat?.value}>{cat?.name}</option>
                ))
              }
          </select>
          <label>Product Brand:</label>
          <select name='brand' value={product?.brand} onChange={handleInputChange}>
              {isEditing?(<option value={product?.brand}>{product?.brand}</option>):
              (<option>Select brand</option>)}
              {
                filteredBrand?.length>0 && filteredBrand?.map((brnd)=>(
                  <option key={brnd?._id} value={brnd?.value}>{brnd?.name}</option>
                ))
              }
          </select>
          <label>Product Color:</label>
          <input type='text' name='color' value={product?.color} placeholder='Product Color' onChange={handleInputChange}/>
          <label>Regular Price:</label>
          <input type='text' name='regularPrice' value={product?.regularPrice} placeholder='Regular Price' onChange={handleInputChange}/>
          <label>Product Price:</label>
          <input type='text' name='price' value={product?.price} placeholder='Product Price' onChange={handleInputChange}/>
          <label>Product Quantity:</label>
          <input type='text' name='quantity' value={product?.quantity} placeholder='Product Quantity' onChange={handleInputChange}/>
          <label>Product Description:</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats}/>
          <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Save Product</button>
          </div>
        </form>
      </Card>
    </div>
  )
}
ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
export default ProductForm