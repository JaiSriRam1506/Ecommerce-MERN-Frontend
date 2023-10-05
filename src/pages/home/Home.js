import Slider from "../../components/slider/Slider";
import './Home.scss'
import HomeInfoBox from "./HomeInfoBox";
import {productData} from '../../components/carousel/data'
import ProductCarousel from '../../components/carousel/ProductCarousel'
import CarouselItem from '../../components/carousel/CarouselItem'
import ProductCategory from "./ProductCategory";
import FooterLinks from '../../components/footer/FooterLinks'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  getProducts } from "../../redux/features/product/productSlice";


//Making Page Heading with Logo
const PageHeading=({heading, btnText})=>{
  return(
    <>
    <div className="--flex-between">
      <div className="--fw-bold"><h3>{heading}</h3></div>
      <button className="--btn">{btnText}</button>
    </div>
    <div className="--hr"></div>
    </>
  )
}

const Home = () => {
  const dispatch=useDispatch();
  const {products}=useSelector((state)=>state.product);

  useEffect(()=>{
   dispatch(getProducts())
  },[dispatch])

  const latestProduct=products.filter((product,index)=>{
    // return product?.quantity>0 && product?.image?.length>0 && index<7 });
    return product?.quantity>0 });

  // To make a template for Carousel Items 
const carouselProducts=latestProduct.map((prod,index)=>{
  return(
  <div key={prod?._id}>
    <CarouselItem
    imageURL={prod?.image[0]}
    name={prod?.name}
    price={prod?.price}
    regularPrice={prod?.regularPrice}
    description={prod?.description}
    product={prod}
    />
  </div>
)})

  return (
    <>
    <Slider/>
    <section>
      <div className="container">
        <HomeInfoBox/>{/*Information about Ecommerce */}
        {/*Latest Product Carousel */}
        <PageHeading heading={'Latest Products'} btnText={'Shop Now 🛍️'}/>
        <ProductCarousel products={carouselProducts}/>
      </div>
    </section>
    <section>
      <div className="container">
        {/*Mobile Phones Carousel */}
        <PageHeading heading={'Mobile Phones'} btnText={'Shop Now 🛍️'}/>
        <ProductCarousel products={carouselProducts}/>
      </div>
    </section>
    <section className="--bg-grey">
      <div className="container">
         {/*Category Section */}
        <h3>Categories</h3>
        <ProductCategory/>
      </div>
    </section>
    <FooterLinks/> {/*All Footer Links Section */}
    </>
  )
}

export default Home;