import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
    const {loading,setLoading}=useState(true);
    const navigate=useNavigate();
    console.log(product);

    useEffect(()=>{
      
      sellerAccountService.getProductData(productID)
       .then((res)=>{
        if(res.total>0){
           console.log(res.documents[0])
            setProuct(res.documents[0]);
            const imageArray=res.documents[0].productImages;
            const arr=[];
            Array.isArray(imageArray) &&  imageArray.forEach(element => {
              arr.push(sellerAccountService.getImagePreview(element));
            });
            setImages(arr);
            setLoading(false);
        }
       }) 
       .catch((error)=>{
        console.log(error);
       })
    },[])






    return(
        <>
      
        {
          loading?"":
        <>
        <div className="absolute z-50   bg-white w-full">
          <div className="svgArea ">

        <svg onClick={()=>navigate('/')} className="absolute z-50 bg-gray-800 bg-opacity-70 mt-2 ml-2 rounded-full px-2 py-2" fill="#ffffffd9" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          width="40px"  viewBox="0 0 495.398 495.398"
          xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
			<path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
		</g>
	</g>
</g>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" className="z-50 bg-opacity-70 bg-gray-800 mt-2 mr-2 rounded-full px-2 py-2 absolute right-0"
 fill="#ffffffd9" x="0px" y="0px" width="43" height="43" viewBox="0 0 48 48">
<path d="M 3.5 6 A 1.50015 1.50015 0 1 0 3.5 9 L 6.2558594 9 C 6.9837923 9 7.5905865 9.5029243 7.7285156 10.21875 L 8.0273438 11.78125 L 11.251953 28.716797 C 11.835068 31.772321 14.527135 34 17.638672 34 L 36.361328 34 C 39.472865 34 42.166064 31.773177 42.748047 28.716797 L 45.972656 11.78125 A 1.50015 1.50015 0 0 0 44.5 10 L 10.740234 10 L 10.675781 9.6582031 C 10.272657 7.5455321 8.4069705 6 6.2558594 6 L 3.5 6 z M 11.3125 13 L 42.6875 13 L 39.800781 28.15625 C 39.484764 29.81587 38.051791 31 36.361328 31 L 17.638672 31 C 15.948808 31 14.516781 29.8158 14.199219 28.15625 L 14.199219 28.154297 L 11.3125 13 z M 20 36 A 3 3 0 0 0 20 42 A 3 3 0 0 0 20 36 z M 34 36 A 3 3 0 0 0 34 42 A 3 3 0 0 0 34 36 z"></path>
</svg>
</div>

        </div>
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

     <div className="w-full mt-4 font-notoSans">
      <div className="w-[96%] mx-auto">

     {product?.discountedPrice?
      <div className=" flex items-center mb-2" >
      <p className="text-[#FE4960] text-2xl font-bold">Rs. {product.discountedPrice?`${product.discountedPrice} `:`${product.price}`}</p>  
      <p className={product.discountedPrice?'text-[13.3px] mt-[6px] font-light self-center text-gray-600 line-through ml-1 mr-1':''} >Rs. {product.price?`${product.price} `:``}</p>      
      <p className="bg-[#FEECEF] text-[#FE5D85]">-{parseInt(100-(product.discountedPrice/product.price)*100)}%</p>
    </div>
     :""
     }
     
      <div className="title-area">
        {product.productTitle}

      </div>
      </div>
      
      </div>   


        </>
}
      </>
    )





}

export default ProductDisplay;