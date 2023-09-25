import React, { useState } from 'react'
import Card from '../../card/Card'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
import { createCategory, getCategories } from '../../../redux/features/category-brand/CatBrandSlice';

const CreateCategory = ({reloadCategory}) => {
  const [name, setName] = useState("");
  const {isLoading}=useSelector((state)=>state.category);
  const dispatch=useDispatch();
  const saveCategory=async(e)=>{
    e.preventDefault();
    console.log(name)
    if(name.length<3)return toast.error('Category must be upto 3 character');
    const formData={
      name
    }
    await dispatch(createCategory(formData));
    await dispatch(getCategories())
   //reloadCategory(); Not required instead use await
    setName('');
  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className="--underline"></div>
      <br />
      <div className='--mb2'>
        <h3>Create Category</h3>
        <p>Use the form to <b>Create the Category.</b></p>
        <Card cardClass={"coupon card"}>
            <br />
            <form onSubmit={saveCategory}>
              <label>Category Name:</label>
              <input type='text' placeholder='CategoryName' value={name} name='name' onChange={(e)=>setName(e.target.value)} required/>
              <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Save Category</button>
              </div>
            </form>
        </Card>
      </div>
    </>
  )
}

export default CreateCategory;