import axios  from 'axios';

//Create Product
const createProduct=async (formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.post(API_URL+'product/',formData)
    return response.data;
}

//Get Products
const getProducts=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'product/')
    return response.data;
}

//Delete Product
const deleteProduct=async (id)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.delete(API_URL+'product/'+id)
    return response.data;
}

//Get Product
const getProduct=async (id)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.get(API_URL+'product/'+id)
    return response.data;
}

//Update Product
const updateProduct=async (id,formData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/`
    const response= await axios.patch(API_URL+'product/'+id,formData)
    return response.data;
}


const ProductService={
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}
export default ProductService;