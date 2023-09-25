import React from 'react'
import CreateBrand from './CreateBrand'
import BrandList from './BrandList'
import './Brand.scss'
import { useDispatch} from 'react-redux'
import { getBrands } from '../../../redux/features/category-brand/CatBrandSlice'

const Brand = () => {
  const dispatch=useDispatch();
  /*Not Required instead use await
  const reloadBrands=()=>{
    dispatch(getBrands());
  }*/
  return (
    <section>
    <div className='container'>
        {/*<CreateBrand reloadBrands={reloadBrands}/>*/}
        <CreateBrand/>
        <BrandList/>
    </div>
</section>
  )
}

export default Brand