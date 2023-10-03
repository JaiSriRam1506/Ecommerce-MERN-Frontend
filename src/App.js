import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getUser, loginStatus } from './redux/features/auth/authSlice';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin'
import AdminOnlyRoutes from './components/hiddenLink/AdminOnlyRoutes';
import PageNotFound from './pages/404/PageNotFound';
import Product from './pages/shop/Product';
import ProductDetails from './components/shop/productDetails/ProductDetails';

const App = () => {
  axios.defaults.withCredentials=true;
  const {isLoggedIn,user}=useSelector((state)=>state.auth)

  const dispatch=useDispatch()


  //Get Login Status and if we refresh the page then it will preserve the login status
  useEffect(()=>{
    dispatch(loginStatus())
  },[dispatch])

  //Whenever page refresh check if user is not null if it is then get it
  useEffect(()=>{
    if(isLoggedIn && !user){
      dispatch(getUser())
    }
  },[dispatch,user,isLoggedIn])
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/shop" element={<Product/>}/>
          <Route path="/product-details/:id" element={<ProductDetails/>}/>
          <Route path="/admin/*" element={<AdminOnlyRoutes><Admin/></AdminOnlyRoutes>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
