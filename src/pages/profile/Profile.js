import React, { useEffect, useState } from 'react'
import './Profile.scss'
import PageMenu from '../../components/pageMenu/PageMenu'
import Card from '../../components/card/Card'
import {useDispatch, useSelector } from 'react-redux'
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import {AiFillFacebook, AiOutlineCloudUpload} from 'react-icons/ai'
import {toast} from 'react-toastify'
import { shortenText } from '../../utils'

const cloud_name=process.env.REACT_APP_CLOUD_NAME;
const upload_preset=process.env.REACT_APP_UPLOAD_PRESET;
const upload_url=process.env.REACT_APP_CLOUDINARYIMAGE_UPLOAD;


const Profile = () => {
    const {isLoading,user}=useSelector((state)=>state.auth)
    const initialState={
        name:user?.name || "",
        email:user?.email || "",
        phone:user?.phone || "",
        role:user?.role || "",
        photo:user?.photo || "",
        address:{
            address:user?.address?.address || "",
            state:user?.address?.state || "",
            country:user?.address?.country || ""
        },

    }

    const [profile,setProfile]=useState(initialState);
    const [imagePreview,setImagePreview]=useState(null);
    const [profileImage,setProfileImage]=useState(null);
    const dispatch=useDispatch()

    const saveProfile=async(e)=>{
        e.preventDefault();
        const userData={
            name:profile.name,
            phone:profile.phone,
            address:{
                address:profile?.address,
                state:profile?.state,
                country:profile?.country
            }
        }
        await dispatch(updateUser(userData))
    }

    const handleImageChange=(e)=>{
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setProfile({...profile,[name]:value})
    }

    useEffect(()=>{
        if(!user){
            dispatch(getUser());
            console.log("Image",user);
        }
    },[dispatch,user])

    useEffect(()=>{
        if(user){
        setProfile({
        name:user?.name || "",
        email:user?.email || "",
        phone:user?.phone || "",
        role:user?.role || "",
        photo:user?.photo || "",
        address:{
            address:user?.address?.address || "",
            state:user?.address?.state || "",
            country:user?.address?.country || ""
        },
        })
    }
    },[dispatch,user])

    const savePhoto=async(e)=>{
        e.preventDefault();
        let imageURL;
        try {
            
            if(profileImage &&(profileImage.type==="image/jpeg" || profileImage.type==="image/jpg" || profileImage.type==="image/png"))
                {
                    const image=new FormData();
                    image.append("file",profileImage)
                    image.append("cloud-name",cloud_name)
                    image.append("upload_preset",upload_preset)


                    //Save Image to Cloudinary

                    const response=await fetch(upload_url,{
                        method:'post',
                        body:image
                    })
                    const imgData=await response.json();
                    imageURL=imgData?.secure_url.toString();

                    //Save the Image URL to database
                    const formData={
                        photo:profileImage?imageURL:profile.photo
                    }
                    await dispatch(updatePhoto(formData));
                    setImagePreview(null)
                    setProfileImage(imageURL);
                }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <>
    <section>
        {isLoading && <Loader/>}
        <div className='container'>
        <PageMenu/>
        <h2>Profile</h2>
        <div className='--flex-start profile'>
            <Card cardClass={'card'}>
            {!isLoading && (
                <>
                <div className='profile-photo'>
                    <div>
                        <img src={imagePreview!==null?imagePreview:user?.photo} alt='profile'/>
                        <h3>Role:{user?.role}</h3>
                        {imagePreview && (
                        <div className='--center-all'>
                        <button className='--btn --btn-secondary' onClick={savePhoto}>
                            <AiOutlineCloudUpload size={18}/>Upload Image
                        </button>
                        </div>
                        )}
                    </div>
                </div>
                <form onSubmit={saveProfile}>
                    <p>
                        <label>Change Photo:</label>
                        <input type='file' accept='image/*' name='image' onChange={handleImageChange}/>
                    </p>
                    <p>
                        <label>Name</label>
                        <input type='text' name='name' value={profile?.name} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Email</label>
                        <input type='email' name='email' value={profile?.email}disabled onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Mobile No</label>
                        <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Address</label>
                        <input type='text' name='address' value={profile?.address?.address} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>State</label>
                        <input type='text' name='state' value={profile?.address?.state} onChange={handleInputChange}/>
                    </p>
                    <p>
                        <label>Country</label>
                        <input type='text' name='country' value={profile?.address?.country} onChange={handleInputChange}/>
                    </p>
                    <button className='--btn --btn-primary --btn-block'>Update Profile</button>
                </form>
                </>
                  )}
            </Card>
        </div>
        </div>
    </section>
    </>
  )
}

export const UserName=()=>{
const {user}=useSelector((state)=>state.auth);
//const [userName,setUserName]=useState("...");
const u_name=user?shortenText(user?.name,8):"..." || "...";
//setUserName(u_name)

return(
    <span style={{color:'#ff7722'}}>Hi,{u_name} |</span>
)
}

export default Profile;