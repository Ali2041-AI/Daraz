import { useSelector } from "react-redux";
import images from "../assets/Images";
import store from "../store/store";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import {  Outlet, useLocation, useNavigate } from "react-router";

function StoreDashboard(){

    const storeData=useSelector((state)=>state.userData.storeData);
    const storeID=storeData?.$id;
    console.log(storeData);
    const [productData,setProductData]=useState([]);
    const location=useLocation();
    const isLoginStoreDashboard = location.pathname === '/account/storeDashboard';

    const navigate=useNavigate();

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
        {
            isLoginStoreDashboard
            ?

          <div>

         <div className="mb-5 w-[97%] mx-auto mt-4">
                            <img className="pointer" onClick={()=>navigate('/account')} src={images.singleBack} alt=""  />
                        </div>

         <div className="w-[97%] mx-auto">

         <div className=" mb-10 mx-auto">
            <p className="login-by-password-header  text-[#2e3346]  text-3xl  font-extrabold leading-[7.067vw]" >Store Dashboard</p>
         </div>
         <div className=" mb-10 mx-auto">
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

         <div className="ProductsArea mb-6">
           Products will be displayed Here
         </div>
          
         <div className="buttons">
            <button onClick={()=>navigate('/account/storeDashboard/postProduct')}  className="bg-blue-600 px-3 py-1 rounded-md text-white">Add New Products</button>
        </div> 
        </div>     
        </div>  
       :<Outlet />
        }
        </>
    )

}

export default StoreDashboard;