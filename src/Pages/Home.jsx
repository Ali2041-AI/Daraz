import { useState } from "react";
import images from "../assets/Images";

function Home(){


    const [search,setSearch]=useState("");

    const handleSearch=()=>{
        console.log(" i am here");


    }





    return(
        <>
        {/* top search area fixex */}
         <div className="search-area  z-50 bg-white w-full fixed top-0  font-notoSans pt-4">
            <div className="w-10/12 mx-auto px-[2px] py-[2px] max-w-[600px] border rounded-full border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={images.searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1 outline-none border-none text-sm" placeholder="search.." value={search} onChange={e=>setSearch(e.target.value)} />
               <button onClick={handleSearch} className="bg-[#f85607] px-2 py-1 text-sm  text-white rounded-full">Search</button>
            </div>
         </div>
         {/* All Products goes here  */}
         <div className="min-h-screen">
            <p>I am here</p>

         </div>
         
         {/* Footer fixed at the bottom */}

         <div className="w-full fixed bottom-0 font-notoSans">
            <div className="w-[81%] mx-auto max-w-[600px] flex justify-between items-center">
            <div className="flex flex-col items-center">
                <img src={images.darazLogo} className="w-6" alt="" srcset="" />
                <p className="text-[10px] opacity-70">Home</p>

            </div>
            <div className="flex flex-col items-center">
                <img src={images.catog} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Categories</p>

            </div>
            <div className="flex flex-col items-center">
                <img src={images.cart} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Cart</p>
            </div>
            <div className="flex flex-col items-center">
                <img src={images.account} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Account</p>
            </div>

            </div>
         </div>
        
        </>
    )

    



    


}

export default Home;