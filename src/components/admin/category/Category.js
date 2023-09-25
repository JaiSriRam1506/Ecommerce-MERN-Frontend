import React from 'react'
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'
import './Category.scss'
import { useDispatch} from 'react-redux'
import { getCategories } from '../../../redux/features/category-brand/CatBrandSlice'

const Category = () => {
  const dispatch=useDispatch()
  /*Not Required instead use await
  const reloadCategory=()=>{
    dispatch(getCategories());
  }*/
  return (
    <section>
        <div className='container'>
            {/*<CreateCategory reloadCategory={reloadCategory}/>*/}
            <CreateCategory/>
            <CategoryList/>
        </div>
    </section>
  )
}

export default Category