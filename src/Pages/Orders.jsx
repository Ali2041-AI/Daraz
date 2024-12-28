import { useNavigate } from "react-router";
import images from "../assets/Images";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { ClipLoader } from "react-spinners";
function Orders(){


    const navigate=useNavigate();
    const userData=useSelector((state)=>state.userData)?.userData;
    console.log("here is the user Data: ", userData)
    const [orders,setOrders]=useState([]);
    const [orderProductsData,setOrderProductsData]=useState([]);
    const [erros,setErrors]=useState(null);
    const [loading,setLoading]=useState(false);


    useEffect(()=>{ 
        setLoading(true);

        console.log(userData);
        if(!userData){
            setErrors("Please Login First")
            setLoading(false);
        }
        else{

        sellerAccountService.getOrders("userID",userData.$id)
        .then((res)=>{  
            if(res.total>0){
                setOrders(res.documents);
                const allOrders=res.documents;

                const productsIDs=allOrders.map((order)=>order.productID);

                sellerAccountService.getProductData(productsIDs)
                .then((res)=>{
                    if(res.total>0){

                    console.log(allOrders);
                    //add quantity and orderStatus in the product data
                    const updatedOrderProductsData=res?.documents.map((product,index)=>{
                        const matchedOrder=allOrders.find((order)=>order.productID===product.$id);
                        if(matchedOrder){

                            return {...product,orderID:matchedOrder?.$id,quantity:matchedOrder.quantity,orderStatus:matchedOrder.orderStatus}
                        }

                    })
                    setOrderProductsData(updatedOrderProductsData);
                    setErrors("");
                    setLoading(false);


                    console.log(updatedOrderProductsData);
                }
                else{
                
                    setLoading(false);
                }


                
                })
            }
            else{
                setErrors("No Orders Found");
                setLoading(false);
            }
            

        }
        )
    }

    },[userData])
    



return(
    <>
    {
        loading?
    
               <div className="flex items-center justify-center min-h-screen" >
                    <ClipLoader color="#F85606"  size={50} />
        </div>
        :

    

    <div className="bg-[#F0F1F6]  min-h-screen">

        <div className="nav-area md:hidden">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/account")} />
                        <p className="font-bold mt-1">My Orders</p>
                    </div>
                </div>
            </div>

            <div className="pt-12 md:pt-28 ">

                {Array.isArray(orderProductsData) && orderProductsData.map((product,index)=>(
                <div key={index}>
                    <Product product={product} orderDisplay={true} />
                </div>
                ))}


</div>



          <p className="errors absolute top-[50%] left-[50%] -translate-x-[50%] font-bold text-[#F85606]" >{erros}</p>

    </div>
    }
    
    </>
)










}
export default Orders;