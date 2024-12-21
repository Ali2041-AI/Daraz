import { useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function CartProductPreview({product,updateQuantity}){

    const [products,setProduct]=useState(product);

    const handleDecrementQuantity=()=>{
        setProduct({...products,quantity:products.quantity-1})
        updateQuantity(products?.$id,products?.quantity-1);

    }
 
    const hanldeIncrementQuantity=()=>{
        setProduct({...products,quantity:products.quantity+1})
        updateQuantity(products?.$id,products?.quantity+1);
     
    }
 
 


    return(
        <>
        <div className="flex gap-2 w-full ">
            <img src={sellerAccountService.getImagePreview(products?.productImages[0])} className=" min-w-0  w-36  h-28 rounded-lg" alt="" />
            <div className="w-full" >
                <p className="truncate-text">
                    {products?.productTitle
                    }
                 </p>
                 <div className="price-section flex justify-between  w-full">
                    <div>
                        <p className="text-[#FE4860] font-bold" >Rs. {products?.price}</p>
                        <p className="text-gray-600 line-through text-sm " >Rs. {products?.discountedPrice}</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-md">
                                    
                                    <button
                                        onClick={handleDecrementQuantity}
                                        className={`bg-gray-200 px-3 py-1 rounded-lg  text-gray-700 hover:bg-gray-300 ${products?.quantity===1?"opacity-25 cursor-not-allowed":""}`}
                                        disabled={products?.quantity===1?true:false}
                                    >
                                        -
                                    </button>

                                    {/* Counter Display */}
                                    <span className="text-lg font-medium text-gray-800">{products?.quantity}</span>

                                    {/* Increment Button */}
                                    <button
                                        onClick={hanldeIncrementQuantity}
                                        className={`bg-gray-200 px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-300 ${products?.quantity===5?"opacity-25 cursor-not-allowed":""}  `}
                                        disabled={products?.quantity===5?true:false}
                                    >
                                        +
                                    </button>
                            </div>
                 </div>

            </div>
        </div>
        </>
    )






}

export default CartProductPreview;