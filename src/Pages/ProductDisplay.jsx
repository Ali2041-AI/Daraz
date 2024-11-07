import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Swiper,SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function ProductDisplay(){


    const [product,setProuct]=useState({});
    const [images,setImages]=useState([]);
    const {productID}=useParams();
    console.log(product);

    useEffect(()=>{
       sellerAccountService.getProductData(productID)
       .then((res)=>{
        if(res.total>0){
            setProuct(res.documents[0]);
            const imageArray=res.documents[0].productImages;
            const arr=[];
            Array.isArray(imageArray) &&  imageArray.forEach(element => {
              arr.push(sellerAccountService.getImagePreview(element));
                
            });
            setImages(arr);
        }
       }) 
       .catch((error)=>{
        console.log(error);
       })
    },[])






    return(
        <>
        <Swiper pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]} className="mySwiper">

        {
            images.map((img,index)=>(
                <SwiperSlide navigation={false} key={index}>
                    <img src={img} alt="" />
                </SwiperSlide>
            ))
        }
          
        </Swiper>

        
      </>
    )





}

export default ProductDisplay;