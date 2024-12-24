import sellerAccountService from "../appwrite/sellerAccountService";
function Product({product,orderDisplay}){





    return(
        <>

               <div  className="flex gap-4 rounded-md p-4 mt-2 bg-white" >
                    <img src={sellerAccountService.getImagePreview(product?.productImages[0])} className="min-w-0 w-32 h-28   rounded-lg" alt="" />
                    <div className="flex flex-col gap-2 w-full" >
                        <div className="flex justify-between gap-4" >
                             <p className="font-bold truncate-text" >{product.productTitle}</p>
                             <p className={`text-[#467BF5] ${!orderDisplay?"hidden":""}`}>{product?.orderStatus} </p>
                        </div>
                        <div className="flex justify-between items-center" >
                            <p className="text-[#F85606] font-bold" >Rs. {product.discountedPrice}</p>
                            <p className={`  text-sm text-gray-500 font-bold`}      >Qty: {product.quantity}</p>
                        </div>
                        <button className={`text-center ${product?.orderStatus!=="delivered"?"hidden":""} bg-[#F85606] text-white rounded-lg py-1`} >WRTIE A REVIEW</button>
                        {/* Shipping fee for each product */}
                        <div className="flex justify-between text-sm" >
                        <p className={`font-bold ${orderDisplay?"hidden":""} `} >Shipping fee </p>
                        <p className={` text-sm text-gray-500 font-bold  ${orderDisplay?"hidden":""} `}  >Rs. 145</p>
                        </div>
                    </div>
                </div>
        
        
        </>
    )




}


export default Product;