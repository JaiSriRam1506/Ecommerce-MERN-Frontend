import styles from './auth.module.scss'
import loginIMG from '../../assets/login.png'
import Card from '../../components/card/Card'
import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { validateEmail } from '../../utils'
import {toast} from 'react-toastify'
import { AUTH_RESET, getUser, login } from '../../redux/features/auth/authSlice'

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const {isLoggedIn,isSuccess,isLoading}=useSelector((state)=>state.auth)

 const loginUser=async(e)=>{
    e.preventDefault();
    if(!email || !password)toast.error("All field are required");
    if(password.length<6)toast.error("Password should be at least 6 character");
    if(!validateEmail(email))toast.error("Incorrect Email");

    const formData={
        email,
        password
    }
    await dispatch(login(formData));
 }
 useEffect(()=>{
  if(isLoggedIn && isSuccess){
    navigate('/');
  }
  dispatch(AUTH_RESET())
},[isLoggedIn,isSuccess,dispatch,navigate])

  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginIMG} alt="LoginImage" width="400"/>
        </div>
        <Card>
        <div className={styles.form}>
            <h2>Login</h2>
        <form onSubmit={loginUser}>
            <input type='text' placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            <button type="submit" className='--btn --btn-primary --btn-block '>Login</button>
        </form>
        <span className={styles.register}>
          <p>Don't have a account?</p>
          <Link to='/register'>Register</Link>
        </span>
        </div>
        </Card>
    </section>
    </>
  )
}

export default Login;