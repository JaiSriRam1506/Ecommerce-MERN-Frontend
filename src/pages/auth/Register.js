import styles from './auth.module.scss'
import loginIMG from '../../assets/login.png'
import Card from '../../components/card/Card'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import { validateEmail } from '../../utils'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../components/loader/Loader'
import {AUTH_RESET, register} from '../../redux/features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

const initialState={
  name:"",
  email:"",
  password:"",
  cPassword:""
}

const Register = () => {
 const [formData, setFormData] = useState(initialState);
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const {name,email,password,cPassword}=formData;
 const {isLoggedIn,isSuccess,isLoading}=useSelector((state)=>state.auth)
 
 const HandleInputChange=(e)=>{
  const {name,value}=e.target;
  setFormData({...formData,[name]:value});
 }
 const registerUser=async(e)=>{
    e.preventDefault();
    if(!email || ! name || !password)toast.error("All field are required");
    if(password.length<6)toast.error("Password should be at least 6 character");
    if(!validateEmail(email))toast.error("Incorrect Email");
    if(password!==cPassword)toast.error("Password don't match");

    const formData={
        name,
        email,
        password
    }
    await dispatch(register(formData));
 }

 useEffect(()=>{
    if(isLoggedIn && isSuccess)navigate('/');
    dispatch(AUTH_RESET())
 },[isLoggedIn,isSuccess,dispatch,navigate])

  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
        <Card>
        <div className={styles.form}>
            <h2>Register</h2>
        <form onSubmit={registerUser}>
            <input type='text' placeholder='Enter your Name' value={name} name='name' onChange={HandleInputChange} required/>
            <input type='text' placeholder='Enter your Email' value={email} name='email' onChange={HandleInputChange} required/>
            <input type='password' placeholder='Enter your password' value={password} name='password' onChange={HandleInputChange} required/>
            <input type='password' placeholder='Confirm password' value={cPassword} name='cPassword' onChange={HandleInputChange} required/>
            <button type="submit" className='--btn --btn-primary --btn-block '>Register</button>
        </form>
        <span className={styles.register}>
          <p>Already have a account?</p>
          <Link to='/login'>Login</Link>
        </span>
        </div>
        </Card>
        <div className={styles.img}>
            <img src={loginIMG} alt="LoginImage" width="400"/>
        </div>
    </section>
    </>
  )
}

export default Register;