import images from "../assets/Images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import sellerAccountService from "../appwrite/sellerAccountService";
import Product from "../components/Product";
import store from "../store/store";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
function CheckoutPage(){

    const navigate=useNavigate();
    
    const location=useLocation();
    
    let { selectedProducts, total,savedAmount } = location.state || {};

    console.log("These are the selected Products: ", selectedProducts)

    
  //creating daraz checkout page
  const userData=useSelector((state)=>state.userData?.userData);
  console.log(userData)
  const userAddresses = useSelector(state => state.userData?.userAddresses?.address);
  const parsedAddresses = userAddresses?.map((address) => {
      try {
          return JSON.parse(address);
      } catch (error) {
          console.error("Failed to parse address:", address, error);
          return null;
      }
  }).filter(address => address !== null);
  const defaultAddress=Array.isArray(parsedAddresses) ? parsedAddresses.filter((address) => address.default) : [];

  const handleOrder=()=>{
    //first check if user is logged in
    if(userData===null){
        navigate('/account/loginSignup');
    }
    else{
        //if user is logged in then check if user has default address
        if(defaultAddress.length===0){
            navigate('/addressPage',{state:{selectedProducts:selectedProducts,total,savedAmount}});
        }
        else{
            //if user has default address then place order  
             // add one product in order one by one using loop
             const userID=userData.$id;
             {Array.isArray(selectedProducts) && selectedProducts.map((product,index)=>{
                const productID=product?.$id;
                const quantity=product?.quantity;
                const orderStatus="processing";
                const storeID=product?.storeID;
                const orderAddress=JSON.stringify(defaultAddress[0]);
                const orderDate=new Date().toDateString();
                sellerAccountService.createOrder({userID,productID,quantity,orderStatus,storeID,orderAddress,orderDate})
                .then((res)=>{  
                    navigate('/orders');
                  })
                .catch((error)=>{console.log(error)})

             } )}

             //now remove all the products from cart



             removeSelectedProductsFromCart();

           
                
      

        }
    }
}

             
const removeSelectedProductsFromCart=()=>{
    sellerAccountService.getCartProductData(userData.$id)
    .then((res)=>{
        if(res.total>0){
            const productsInCart= Array.isArray(res.documents[0]?.products) && res.documents[0]?.products?.map((product)=>JSON.parse(product));
            //now match the selected Products ID with the productsInCart ID and remove the matched products from cart
            const updatedProductsInCart=productsInCart.filter((product)=>{

              const matchedProduct=selectedProducts.find((item)=>item?.$id===product.productID);

              if(!matchedProduct){
                return product;
              }
            })

            if(updatedProductsInCart.length===0){
                sellerAccountService.deleteCart(res.documents[0].$id)
            }
            else{
                const updatedProductsInCartString=updatedProductsInCart.map((product)=>JSON.stringify(product));
                sellerAccountService.updateCartProductData({cartID:res.documents[0].$id ,products:updatedProductsInCartString})
            }
        }
    })
}

const navigateToOrders=()=>{
    navigate('/orders');
}

 



    return(
        <>
        <div>
            {
                // loading
                // ?
                // <div className="min-h-screen w-full flex justify-center items-center">
                    // <ClipLoader color="#f76b05" size={55} />
                // </div>
                // :


        <div className="bg-[#F0F1F6]  min-h-screen" >
            <div className="nav-area">
            <ClipLoader color="#f76b05" />
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/cart")} />
                        <p className="font-bold mt-1">Checkout</p>
                    </div>
                </div>
            </div>
            {
                userData===null
                ?
                <div className="bg-white">

               <div className="text-[#F85606] rounded-md font-bold absolute top-[50%] left-[50%] -translate-y-[50%] pointer-cursor  -translate-x-[50%]" >
                        <p className="mb-2" >Log in first</p>
                        <button className="border-[1px] px-4 py-1 border-[#F85606]" >Log in</button>
                         </div>



                </div>
                :
            <div className="addressArea bg-white pt-14 p-4   flex gap-4 items-center">
                
                <img src={images.addressIcon} className="rounded-full w-8" alt="" />
                <div className="self-start w-full">
                    <div className="flex self-start gap-3">
                        <p className="font-bold self-start">{userData?.name}</p>
                        <p className="opacity-65">{defaultAddress[0]?.phoneNumber}</p>
                    </div>
                    <div className="flex justify-between w-full  items-center">
                        <p className="text-sm opacity-55" >{defaultAddress[0]?.completeAddress}</p>
                        <img className="w-6" onClick={()=>navigate(`/addressPage`,{state:{selectedProducts:selectedProducts,total,savedAmount}})} src={images.iconLeft} alt="" />
                    </div>
                </div>

            </div>
}

         <div className="mt-2">

            {Array.isArray(selectedProducts) && selectedProducts.map((product,index)=>(
             <div key={index}>
                <Product product={product} orderDisplay={false} />
             </div>
            ))}


         </div>

          {/* bill total area */}

            <div className="flex gap-4 mb-16 p-4 bg-white mt-2" >
                <div className="flex w-full flex-col gap-2" >
                    <div className="flex justify-between" >
                        <p className="font-bold" >Subtotal</p>
                        <p className="font-bold" >Rs.{total}</p>
                    </div>
                    <div className="flex justify-between" >
                        <p className="font-bold" >Shipping</p>
                        <p className="font-bold" >Rs.{145 *  selectedProducts?.length}</p>
                    </div>
                    <div className="flex justify-between" >
                        <p className="font-bold" >Total</p>
                        <p className="font-bold" >Rs.{total+(145*selectedProducts?.length)}</p>
                    </div>
                </div>
            </div>





         <div className="footer-area flex justify-end rounded-md   w-full p-4 items-end fixed bottom-0 bg-white ">
             
                
                <div className="flex   " >
                    <div className="flex flex-col">
                        <div className="flex" >
                            <p className="font-bold mr-2 " >Total: </p>
                            <p className="text-[#FE4860] font-bold mr-2" >Rs.{total + (145* selectedProducts?.length)}</p>
                        </div>
                        <div className="flex self-end" >
                            <p className="text-[#FE4860] text-[10px] mr-2">Saved </p>
                            <p className="text-[#FE4860] text-[10px] mr-2">Rs.{savedAmount}</p>
                        </div>
                    </div>
                    <button onClick={handleOrder}  className="bg-[#F85606] text-white font-semibold rounded-md px-2 py-1" >Place Order({selectedProducts?.length})</button>
                </div>

            </div>

        </div>
            }


        </div>



        </>
    )




    




}

export default CheckoutPage;