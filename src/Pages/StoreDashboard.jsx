import { useSelector } from "react-redux";
import images from "../assets/Images";
import store from "../store/store";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function StoreDashboard(){

    const storeData=useSelector((state)=>state.userData.storeData);
    const storeID=storeData?.$id;
    console.log(storeData);
    const [productData,setProductData]=useState([]);

    useEffect(()=>{
        sellerAccountService.getSellerProductData(storeID)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })



    },[])


    return(
        <>
         <div className="w-[97%] mb-10 mx-auto">
            <p className="login-by-password-header  text-[#2e3346]  text-3xl  font-extrabold leading-[7.067vw]" >Store Dashboard</p>
         </div>
         <div className="w-[97%] mb-10 mx-auto">
            <p className="login-by-password-header  text-[#2e3346]  text-xl  font-extrabold leading-[7.067vw]" >My Products</p>
         </div>

         <div className="w-full fixed bottom-0 font-notoSans">
            <div className="w-[81%] mx-auto max-w-[600px] flex justify-between items-center">
            <div className="flex flex-col items-center">
                <img src={images.sellerProducts} className="w-6" alt=""  />
                <p className="text-[10px] opacity-70">Products</p>

            </div>
            <div className="flex flex-col items-center">
                <img src={images.revenue} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Revenue</p>

            </div>
            <div className="flex flex-col items-center">
                <img src={images.orders} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Orders</p>
            </div>
            <div className="flex flex-col items-center " onClick={()=>navigate('/account')}>
                <img src={images.settings} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Settings</p>
            </div>

            </div>
         </div>
        </>
    )

}

export default StoreDashboard;