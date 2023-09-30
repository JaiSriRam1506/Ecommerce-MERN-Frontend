import React, { useState } from 'react'
import Card from '../../card/Card'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

const cloud_name=process.env.REACT_APP_CLOUD_NAME;
const upload_preset=process.env.REACT_APP_UPLOAD_PRESET;
const upload_url=process.env.REACT_APP_CLOUDINARYIMAGE_UPLOAD;

const UploadWidget = ({files,setFiles}) => {
    const [selectedImages,setSelectedImages]=useState([]);
    const [images, setImages] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const dispatch=useDispatch()


    const removeImage=(image)=>{
    console.log("Image:",image,selectedImages,images)
    const idx=selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img)=>img!==image))
    //setSelectedImages(selectedImages.filter((img)=>console.log(img)))
    setImages(images.filter((img,index)=>index!==idx))
    //setImages(images.filter((img,index)=>console.log(img,index)))

    URL.revokeObjectURL(image);
    }

    const addImage=(e)=>{
        const selectedImage=e.target.files;
        const imageArray=Array.from(selectedImage);

        const selectedImageURL=imageArray.map((img)=>URL.createObjectURL(img))
        setSelectedImages((prevImage)=>prevImage.concat(selectedImageURL));
        setImages((prevImage)=>prevImage.concat(imageArray))
        e.target.value=''
    }
    const uploadImage=()=>{
        setUploading(true);
        let imageURLs=[];
        try {
                let image=new FormData();
                images.map((file)=>{
                    image.append("file",file)
                    image.append("folder-",'EcommerceApp')
                    image.append("upload_preset",upload_preset)
                fetch(upload_url,{
                        method:'post',
                        body:image
                    })
                    .then((response)=>response.json())
                    .then((data)=>{
                        console.log("data",data)
                        imageURLs.push(data.secure_url.toString())
                        setProgress(imageURLs.length)
                        if(imageURLs.length===images.length){
                            setFiles((preImage)=>preImage.concat(imageURLs))
                            console.log(imageURLs);
                            setUploading(false);
                            console.log(files);
                            toast.success("Image upload complete");
                            setImages([]);
                            setSelectedImages([]);
                            setProgress(0);
                        }
                    })
                })
                //Save the Image URL to database
                const formData={
                        imageURLs
                    }
                    // await dispatch();
                    // selectedImages(null)
                }
        catch (error) {
            setUploading(false)
            toast.error(error.message)
            console.log(error)
        }

    }

  return (
    <div>
        <Card cardClass={'formcard group'}>
            <label className='uploadWidget'>
                <AiOutlineCloudUpload size={35} />
                <br/>
                <span>Click to Upload upto 5 Images</span>
                <input type='file' name='image' onChange={addImage} multiple accept='image/png, image/jpeg, image/jpg, image/webp'/>
                </label>
            <br/>
            {selectedImages.length>0 && (selectedImages.length>5?(
                <p className='error'>You can't upload more than 5 Image!
                <br />
                <span>Please remove <b>{selectedImages.length-5}</b> Images of them</span>
                </p>
            ):(
                <div className='--center-all'>
                    <button className='--btn --btn-danger --btn-large' disabled={uploading} onClick={uploadImage}>
                        {uploading?(`Uploading ${progress} of ${images.length}`):(`Upload ${selectedImages.length} images(s)`)}
                    </button>
                </div>
            ))}
            {/*Selected Image*/}
            <div className={selectedImages.length>0?'images':''}>
                    {selectedImages.length!==0 && selectedImages.map((image,index)=>{
                        return(
                            <div key={image} className='image'>
                                <img src={image} alt='productImage' width={200}/>
                                <button className='-btn' onClick={()=>removeImage(image)}>
                                    <BsTrash size={20}/>
                                </button>
                                <p>{index+1}</p>
                            </div>
                        )
                    })}
                </div>
        </Card>
    </div>
  )
}

export default UploadWidget