import { useSelector } from "react-redux";
import { json, useNavigate, useParams } from "react-router";
import { Swiper,SwiperSlide } from "swiper/react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Navigation,Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { setProducts } from "../store/darazSlice";
import Delivery from "../components/Delivery";
import Services from "../components/Services";
import ProductReviewSection from "../components/ProductReviewSection";
import QnaPreviewSection from "../components/QnaPreviewSection";
import Description from "../components/Description";

function ProductDisplay(){


    const [product,setProuct]=useState({});
    console.log(product);
    const [images,setImages]=useState([]);
    const [reviews,setProductReviews]=useState([]);

    const [isScrolled, setIsScrolled] = useState(false);
    
    const {productID}=useParams();
    const [productImage,setProductImage]=useState([]);
    const [productRating,setProductRating]=useState(0);
    const [totalRatings,setTotelRatings]=useState(0);
    const [selectedColor,setSelectedColor]=useState("");
    const [selectedSize,setSelectedSize]=useState("");

    const [error,setError]=useState(false);
    const [statusMessage,setStatusMessage]=useState("");
    const [actionMessage,setActionMessage]=useState("");


    const [imageLimitError,setImageLimitError]=useState(false); 
    const [productImages,setProductImages]=useState([]);
    const [imageCount,setImageCount]=useState(1);

    // console.log(`Here is the product: `,product);


    const {loading,setLoading}=useState(true);
    const [inputReview,setInputReview]=useState("");
    const [inputReviewStars,setInputReviewStart]=useState(0);
    const userData=useSelector(state=>state.userData?.userData);
    const userID=userData?.$id;
    const userName=userData?.name;
  
    const navigate=useNavigate();
    


    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(()=>{
      
      sellerAccountService.getProductData(productID)
       .then((res)=>{
        if(res.total>0){
          //  console.log(res.documents[0])
            setProuct(res.documents[0]);
            Array.isArray(res.documents[0].colors)  &&  res.documents[0].colors.length>0 ? setSelectedColor(res.documents[0].colors[0]):setSelectedColor("");
            const imageArray=res.documents[0].productImages;
            const arr=[];
            Array.isArray(imageArray) &&  imageArray.forEach(element => {
              arr.push(sellerAccountService.getImagePreview(element));
            });
            setImages(arr);
            // setLoading(false);
            // console.log(`Here is the Product ID: `,productID);
            sellerAccountService.getReviewData(productID)
            .then((res)=>{
              if(res.total>0){
                 setProductReviews(res.documents);
                 calculateRatings(res.documents);
                 setTotelRatings(res.documents.length);
              }
            })
        }
       }) 
       .catch((error)=>{
        console.log(error);
       })
    },[])

    const giveReview=()=>{
      const reviewText=inputReview;
      const reviewStars=inputReviewStars;
      const reviewImages=productImages;
      sellerAccountService.createReview({name:userName,productID,userID,reviewText,reviewStars,reviewImages})
      .then((res)=>{
        // console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

  
    const calculateRatings=(allReview)=>{
      let sumReviews=0;
      Array.isArray(allReview) && allReview.forEach((review)=>{
        sumReviews+=parseFloat(review.reviewStars);
      })
      const averageRating = (sumReviews / allReview.length).toFixed(1); 
      setProductRating(averageRating);

    }


    const addImage=()=>{
      setImageLimitError(false);
      if(productImages.length>3){
          setImageLimitError(true);
          return;
      }
      if(imageCount>5){
          setImageLimitError(true);
          return;

      }
      sellerAccountService.addImage(productImage)
      .then((fileID)=>{
         const newArr=[...productImages,fileID];
         setProductImages(newArr);
        //  console.log(newArr);
         setProductImage([]);
      })
      .catch((error)=>{
          console.log(error);
      })
  
  setProductImage([]);

}

const addProductToCart=()=>{

  if(!userID){
   statusSetter("Log in first!!","Go To Log in");
  }
  else{

    const newProduct={
      productID:product?.$id,
      quantity:1
    }




    sellerAccountService.getCartProductData(userID)
    .then((res)=>{
      //No cart
      if(res.total===0){
         //create Cart
         const products=[JSON.stringify(newProduct)];
         console.log(products);
         sellerAccountService.addProductToCart({userID,products})
         .then((res)=>{
          console.log(res);
          statusSetter("Successfully added to cart","Go To Cart")

         })
         
      }
      else{
        const cartData=res?.documents[0];
        const cartProductsStringify=cartData?.products;
        let cartProductArray = cartProductsStringify.map((item) => JSON.parse(item));
        const isProductInCart=Array.isArray(cartProductArray) && cartProductArray.some((item)=>item.productID===newProduct.productID);
        
        if(!isProductInCart){
           Array.isArray(cartProductArray) && cartProductArray.push(newProduct);
          const products=cartProductArray.map((item)=>JSON.stringify(item));
          sellerAccountService.updateCartProductData({cartID:cartData?.$id,products})
          .then((res)=>{
            console.log(res)
            statusSetter("Successfully added to cart","Go To Cart")
          })
          .catch((error)=>{
            console.log(error);
          })
        }
        else{

         statusSetter("Already in the cart!!","Go To Cart")

        }


     
        

      }
    })
    .catch((error)=>{
      console.log(error)
  })

  }
  

}

const statusSetter=(message,actionMessage)=>{
  setError(true);
  setStatusMessage(message);
  setActionMessage(actionMessage);

  setTimeout(()=>{
    setError(false);
  },5000)
}


 const handleNavigation=()=>{
     if(!userID){
      navigate('/account/loginSignup')
     }
     else{
      navigate("/cart")
     }

 }



    return(
        <div className="bg-[#F8F8F8]">
      
        {
          loading?"":
        <>
        <div className="absolute z-50 bg-white    w-full">

        <div
      className={`svgArea fixed flex w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-lg pb-3' : 'bg-transparent'
      }`}
    >
      <svg
        onClick={() => navigate('/')}
        className="z-50 bg-gray-800 bg-opacity-70 mt-2 ml-2 rounded-full px-2 py-2"
        fill="#ffffffd9"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        viewBox="0 0 495.398 495.398"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z" />
              <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z" />
            </g>
          </g>
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={()=>navigate("/cart")}
        className="z-50 bg-opacity-70 bg-gray-800 mt-2 mr-2 rounded-full px-2 py-2 fixed right-0 "
        fill="#ffffffd9"
        x="0px"
        y="0px"
        width="43"
        height="43"
        viewBox="0 0 48 48"
      >
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
                    <img src={img} className="w-full h-[320px]" alt="" />
                </SwiperSlide>
            ))
        }
          
        </Swiper>

     <div className="w-full bg-white  pt-4 font-notoSans">
      <div className="w-[96%] mx-auto">

     {product?.discountedPrice?
      <div className=" flex items-center mb-2" >
      <p className="text-[#FE4960] text-2xl font-bold">Rs. {product.discountedPrice?`${product.discountedPrice} `:`${product.price}`}</p>  
      <p className={product.discountedPrice?'text-[13.3px] mt-[6px] font-light self-center text-gray-600 line-through ml-1 mr-1':''} >Rs. {product.price?`${product.price} `:``}</p>      
      <p className="bg-[#FEECEF] text-[#FE5D85]">-{parseInt(100-(product.discountedPrice/product.price)*100)}%</p>
    </div>
     :""
     }
     
      <div className="title-area opacity-85">
        {product.productTitle}
      </div>
      
      <div className="ratings-section text-[14px] mt-2  ">
        <Stack spacing={1}>
          <div className="flex gap-2 items-center " >
            <Rating name="half-rating-read" size="small" defaultValue={0} value={productRating}  precision={0.5} readOnly />
            <span className="opacity-45">{productRating}</span>
            <span className="opacity-45">({totalRatings})</span>
          </div>
          </Stack>
      </div>
      </div>


      </div>   


      <div className="options-section pb-4  text-sm ml-2 bg-white mt-2">
       <p className="opacity-60 pt-2 mb-4" >Product Options</p>

       {Array.isArray(product.colors)  && product.colors.length>0    && <span className="mr-2">Colors: </span> }
       {Array.isArray(product.colors) && product.colors.map((color,index)=>{
        return(
        <span key={color} className={`border-black cursor-pointer ${selectedColor===color?"border-2 opacity-90":""}  border mr-2 text-[14px] p-1 opacity-70`} onClick={()=>setSelectedColor(color)} >{color}  </span>
        )
       }) }

     {Array.isArray(product.sizes) && product.sizes.length>0  && <span className="mr-2">Sizes: </span> }
     
     {Array.isArray(product.sizes) && product.sizes.map((size,index)=>{
        return(
        <span key={size} className={`border-black cursor-pointer ${selectedSize===size?"border-2 opacity-90":""}  border mr-2 text-[14px] p-1 opacity-70`} onClick={()=>setSelectedSize(size)} >{size}  </span>
        )
       }) }



      </div>


       {/* Delivery Component */}

       <Delivery  productID={productID}  />
       
       <Services />

       {/* Display One Review Randomly */}
       <ProductReviewSection reviews={reviews} />


       {/* QNA */}

       <QnaPreviewSection  productID={productID} />


       <Description Description={product?.description} productImages={images} />

       {/*        */}
      

       <div className={`section-area fixed bottom-9  transition-all duration-500 ${error?"opacity-100  ":"opacity-0 "}  w-full flex justify-between  text-sm  p-4 bg-[#323232]  text-white      tracking-wider `}>
          <p>{statusMessage}</p>
          <button className="text-blue-600" onClick={handleNavigation} >{actionMessage}  </button>
        </div>
      <div className="fixed bottom-0   w-full bg-white text-white" >
      
        <div>
         <button className=" bg-gradient-to-tr from-[#47CEEE] to-[#17A5DB] px-4 py-2 w-[50%] " >Buy Now</button>
         <button className=" bg-gradient-to-tr from-[#FF9E35] to-[#FF6A03] px-4 py-2 w-[50%] " onClick={addProductToCart} >Add to Cart</button>
        </div>
      </div>























     <div className="mt-96">

      <input type="text" value={inputReview} placeholder="Review...." onChange={e=>setInputReview(e.target.value)} className="border-2 border-black" />
      <input type="number" value={inputReviewStars} placeholder="Review...." onChange={e=>setInputReviewStart(e.target.value)} className="border-2 border-black" />
      <button onClick={giveReview}  className="bg-blue-600 rounded-full text-white px-2 py-1"  >Give Review</button>
     </div>
      


      <p className="my-10" >All products Reveview Are Below: </p>


      {Array.isArray(reviews) && reviews.map((itemReview)=>{

     return(   
      <div>
        <p>{itemReview.reviewText}</p>
        <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly />
        </Stack>
      
      </div>
     )

      }) }

<label htmlFor="images">Upload Product Images</label>     
        
        <div className="flex gap-8 items-center">

        <input className="w-52" type="file" accept="image/png ,  ,image/jpg ,image/webp , image/jpeg, image/gif"  onChange={e=>setProductImage(e.target.files[0])} />
              <button type="button" onClick={addImage} className="bg-red-600 w-14 h-14 rounded-full text-3xl  hover:bg-red-500 text-white">+</button>     
        </div>


        </>
}
      </div>
    )





}

export default ProductDisplay;