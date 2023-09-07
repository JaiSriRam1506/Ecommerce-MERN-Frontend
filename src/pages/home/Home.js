import Slider from "../../components/slider/Slider";
import './Home.scss'
import HomeInfoBox from "./HomeInfoBox";
import {productData} from '../../components/carousel/data'
import ProductCarousel from '../../components/carousel/ProductCarousel'
import CarouselItem from '../../components/carousel/CarouselItem'
import ProductCategory from "./ProductCategory";
import FooterLinks from '../../components/footer/FooterLinks'


const products=productData.map((prod,index)=>(
  <div key={prod.id}>
    <CarouselItem
    imageURL={prod.imageurl}
    name={prod.name}
    price={prod.price}
    description={prod.description}
    />
  </div>
))

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
  return (
    <>
    <Slider/>
    <section>
      <div className="container">
        <HomeInfoBox/>
        <PageHeading heading={'Latest Products'} btnText={'Shop Now 🛍️'}/>
        <ProductCarousel products={products}/>
      </div>
    </section>
    <section>
      <div className="container">
        <PageHeading heading={'Mobile Phones'} btnText={'Shop Now 🛍️'}/>
        <ProductCarousel products={products}/>
      </div>
    </section>
    <section className="--bg-grey">
      <div className="container">
        <h3>Categories</h3>
        <ProductCategory/>
      </div>
    </section>
    <FooterLinks/>
    </>
  )
}

export default Home;