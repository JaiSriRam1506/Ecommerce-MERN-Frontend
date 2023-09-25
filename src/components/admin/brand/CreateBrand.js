import React, { useEffect, useState } from 'react'
import Card from '../../card/Card'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
import { createBrand, getBrands, getCategories } from '../../../redux/features/category-brand/CatBrandSlice';

const CreateBrand = ({reloadBrands}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const {isLoading,categories}=useSelector((state)=>state.category);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getCategories());
  },
  [dispatch])

  const saveBrand=async(e)=>{
    e.preventDefault();
    if(name.length<3)return toast.error('Brand must be at least 4 character');
    if(!category)return toast.error('Please select category');
    const formData={
      name,
      category
    }
    await dispatch(createBrand(formData));
    await dispatch(getBrands())
    //reloadBrands(); ---Not Required instead use await
    // setName('');
    // setCategory('');
  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className="--underline"></div>
      <br />
      <div className='--mb2'>
        <h3>Create Brand</h3>
        <p>Use the form to <b>Create the Brand.</b></p>
        <Card cardClass="coupon card">
            <br />
            <form onSubmit={saveBrand}>
              <label>Brand Name:</label>
              <input type='text' placeholder='BrandName' value={name} name='name' onChange={(e)=>setName(e.target.value)} required/>
              <label>Parent Category:</label>
              <select name='category' className='form-control' onClick={(e)=>{setCategory(e.target.value)}}>
                <option>Select Category</option>
                {categories.length>0 && 
                    categories.map((cat)=>(
                      <option key={cat._id} name={cat.name}>{cat.name}</option>
                    ))
                }
              </select>
              <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Save Brand</button>
              </div>
            </form>
        </Card>
      </div>
    </>
  )
}

export default CreateBrand