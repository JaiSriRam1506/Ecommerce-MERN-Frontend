import axios  from 'axios';

//Create Category
const createCategory=async (formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.post(API_URL+'category/createCategory',formData)
    return response.data;
}

//Get Category
const getCategories=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'category/getCategories')
    return response.data;
}

//Delete Category
const deleteCategory=async (slug)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.delete(API_URL+'category/deleteCategory/'+slug)
    return response.data;
}

//Create Brand
const createBrand=async (formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.post(API_URL+'brand/createBrand',formData)
    return response.data;
}

//Get Category
const getBrands=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'brand/getBrands')
    return response.data;
}

//Delete Category
const deleteBrand=async (slug)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.delete(API_URL+'brand/deleteBrand/'+slug)
    return response.data;
}

const CatBrandService={
    createCategory,
    getCategories,
    deleteCategory,
    createBrand,
    getBrands,
    deleteBrand
}
export default CatBrandService;