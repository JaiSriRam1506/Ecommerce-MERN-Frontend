import axios  from 'axios';

const register=async (userData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.post(API_URL+'register',userData)
    return response.data.data;
}

const login=async (userData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.post(API_URL+'login',userData)
    //console.log("loginStatus",response.data.data)
    return response.data.data;
}

const logout=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.post(API_URL+'logout')
    return response.data.message;
}

const loginStatus=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.get(API_URL+'loginStatus')
    //console.log("loginStatus",response.data)
    return response.data;
}

const getUser=async ()=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.get(API_URL+'getUser')
    return response.data.data;
}

const updateUser=async (userData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.patch(API_URL+'updateUser',userData)
    return response.data.data;
}

const updatePhoto=async (userData)=>{
    const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
    const API_URL=`${BACKEND_URL}/api/v1/user/`
    const response= await axios.patch(API_URL+'updatePhoto',userData)
    return response.data.data;
}
const authService={
    register,
    login,
    logout,
    loginStatus,
    getUser,
    updateUser,
    updatePhoto
}

export default authService;