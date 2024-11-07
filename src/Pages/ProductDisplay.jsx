import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Swiper,SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/navigation'
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function ProductDisplay(){


    const [product,setProuct]=useState({});
    const {productID}=useParams();
    console.log(product);

    useEffect(()=>{
       sellerAccountService.getProductData(productID)
       .then((res)=>{
        if(res.total>0){
            setProuct(res.documents[0]);
        }
       }) 
       .catch((error)=>{
        console.log(error);
       })
    },[])






    return(
        <>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </>
    )





}

export default ProductDisplay;