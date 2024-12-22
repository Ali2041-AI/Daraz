import images from "../assets/Images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import sellerAccountService from "../appwrite/sellerAccountService";
function CheckoutPage(){

    const navigate=useNavigate();
    const location=useLocation();
    
    const { selectedProducts, total } = location.state || {};

    
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

  const handleNavigate=()=>{


  }



    return(
        <>
        <div className="bg-[#F0F1F6]  min-h-screen" >
            <div className="nav-area">
                <div className="flex bg-white fixed border-b w-full p-2 items-center justify-between gap-4" >
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
                        <img className="w-6" onClick={()=>navigate(`/addressPage`)} src={images.iconLeft} alt="" />
                    </div>
                </div>

            </div>
}

         <div className="mt-2">

            {Array.isArray(selectedProducts) && selectedProducts.map((product,index)=>(
                <div key={index} className="flex gap-4 rounded-md p-4 mt-2 bg-white" >
                    <img src={sellerAccountService.getImagePreview(product?.productImages[0])} className="min-w-0 w-32 h-28   rounded-lg" alt="" />
                    <div className="flex flex-col gap-2 w-full" >
                        <p className="font-bold truncate-text" >{product.productTitle}</p>
                        <div className="flex justify-between items-center" >
                            <p className="text-[#F85606] font-bold" >Rs. {product.discountedPrice}</p>
                            <p className="text-sm text-gray-500 font-bold" >Qty: {product.quantity}</p>
                        </div>
                    </div>
                </div>
            ))}


         </div>

          {/* bill total area */}

            <div className="flex gap-4  p-4 bg-white mt-2" >
                <div className="flex w-full flex-col gap-2" >
                    <div className="flex justify-between" >
                        <p className="font-bold" >Subtotal</p>
                        <p className="font-bold" >Rs.{total}</p>
                    </div>
                    <div className="flex justify-between" >
                        <p className="font-bold" >Shipping</p>
                        <p className="font-bold" >Rs.145</p>
                    </div>
                    <div className="flex justify-between" >
                        <p className="font-bold" >Total</p>
                        <p className="font-bold" >Rs.{total+145}</p>
                    </div>
                </div>
            </div>





         <div className="footer-area flex justify-end rounded-md  w-full p-4 items-end fixed bottom-0 bg-white ">
             
                
                <div className="flex   " >
                    <div className="flex flex-col">
                        <div className="flex" >
                            <p className="font-bold mr-2 " >Total: </p>
                            <p className="text-[#FE4860] font-bold mr-2" >Rs.{total+145}</p>
                        </div>
                        <div className="flex self-end" >
                            <p className="text-[#FE4860] text-[10px] mr-2">Saved </p>
                            <p className="text-[#FE4860] text-[10px] mr-2">Rs.{300}</p>
                        </div>
                    </div>
                    <button onClick={handleNavigate}  className="bg-[#F85606] text-white font-semibold rounded-md px-2 py-1" >Place Order({selectedProducts.length})</button>
                </div>

            </div>

        </div>


        </>
    )




    




}

export default CheckoutPage;