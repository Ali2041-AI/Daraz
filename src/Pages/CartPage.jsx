import { useNavigate } from "react-router";
import images from "../assets/Images";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function CartPage(){

    const navigate=useNavigate();
    const userData=useSelector((state)=>state.userData)?.userData;

    const [cartProducts,setCartProducts]=useState([]);
    const [total,setTotal]=useState(0);
    console.log(cartProducts);
    const [savedAmount,setSavedAmount]=useState(0);
    const [selectedProducts,setSelectedProducts]=useState([]);
    console.log(userData)



    useEffect(()=>{
     
        sellerAccountService.getCartProductData(userData?.$id)
        .then((res)=>{
            if(res.total>0)
            setCartProducts(res.documents[0]);
        })


    }
    ,[]
)








    return(
        <>
        <div className="bg-[#f5f5f5] min-h-screen" >

         <div className="nav-area">
            <div className="flex bg-white fixed border-b w-full p-2 items-center gap-4" >
                <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/")} />
                <p className="font-bold mt-1">My Cart</p>
            </div>

            <div className="main-area  pt-28" >

                {
                    userData
                    ?<div>Yes i have the userData</div>
                    :<div className="text-[#F85606]  font-bold absolute top-[50%] left-[50%] -translate-y-[50%] pointer-cursor  -translate-x-[50%]" >
                        <p className="mb-2" >Log in first</p>
                        <button className="border-[1px] px-4 py-1 border-[#F85606]" >Log in</button>
                         </div>

                }

            </div>
            <div className="footer-area flex justify-between w-full p-4 items-center fixed bottom-0 bg-white ">
                <div>
                    <input type="checkBox" id="allcheckBox" />
                    <label htmlFor="allcheckBox" className="ml-1">All</label>
                </div>
                
                <div className="flex items-center" >
                    <p className="font-bold mr-2 " >Total: </p>
                    <p className="text-[#FE4860] font-bold mr-2" >Rs.{total}</p>
                    <button className="bg-[#F85606] text-white font-semibold rounded-md px-2 py-1" >Check out({selectedProducts.length})</button>
                </div>

            </div>

         </div>

        </div>

        </>
    )



}

export default CartPage;