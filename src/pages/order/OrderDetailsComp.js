import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrder } from '../../redux/features/order/orderSlice';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Spinner } from '../../components/loader/Loader';
import { shortenText } from '../../utils';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const OrderDetailsComp = ({orderPageLink}) => {
  const dispatch=useDispatch();
  const {id}=useParams()
  const pdfRef=useRef();
  const {isLoading, order}=useSelector((state)=>state.order)

  useEffect(()=>{
    dispatch(GetOrder(id))
  },[dispatch])

  const downloadInvoice=()=>{
    const input = pdfRef.current;
    html2canvas(input,{useCORS: true}).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`Invoice-${order._id}.pdf`);
    }
)}

  return (
      <div className='container' ref={pdfRef}>
        <h2>Order Details</h2>
        <div>
          <Link to={orderPageLink}>&larr;Back to Orders</Link>
        </div>
        <br/>
        <div className='table'>
          {isLoading && order===null?(
            <Spinner/>
          ):(
            <>
              <p>
                <b>Ship to: </b>{order?.shippingAddress?.name}
              </p>
              <p>
                <b>Order Id: </b>{order?._id}
              </p>
              <p>
                <b>Order Amount: </b>{order?.orderAmount.toFixed(2)} Rs
              </p>
              <p>
                <b>Coupon: </b>{order?.coupon?.name} | {order?.coupon?.discount}%
              </p>
              <p>
                <b>Payment Method: </b>{order?.paymentMethod}
              </p>
              <p>
                <b>Order Status: </b>{order?.orderStatus}
              </p>
              <p>
                <b>Shipping Address: </b><br/>
                Address: {order?.shippingAddress?.line1}, {order?.shippingAddress?.line2}
                <br/>
                City: 
                {order?.shippingAddress?.city}
                <br/>
                State: 
                {order?.shippingAddress?.state}
                <br/>
                Area Code: 
                {order?.shippingAddress?.postal_code}
                <br/>
                Country: 
                {order?.shippingAddress?.country}
              </p>
              <br/>
              <table>
                <thead>
                  <tr>
                    <td>s/n</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total Price</td>
                    <td>Action</td>
                  </tr>
                  </thead>
                  <tbody>
                  {order?.cartItems?.map((item,index)=>{
                                const {_id,name,price,image,cartQuantity}=item;
                                return(
                                    <tr key={_id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <p><b>{shortenText(name,50)}</b></p>
                                            <img src={image?.length>0?image[0]:""} alt={name} style={{width:"100px",height:"100px"}}/>
                                        </td>
                                        <td>{price}</td>
                                        <td>{cartQuantity}</td>
                                        <td>Rs {cartQuantity*price}</td>
                                        <td className='icons'>
                                           <button className='--btn --btn-primary'> Review Product</button>
                                        </td>
                                        
                                    </tr>)
                            })}  
                  </tbody>
                  </table>
            </>
          )}
        </div>
        <div className='--center-all'>
        <button className='--btn --btn-primary --btn-lg' onClick={downloadInvoice}> Download Invoice</button>
        </div>
      </div>
  )
}

export default OrderDetailsComp