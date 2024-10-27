import { useState } from "react";
import searchIcon from '../assets/search.png'

function Home(){


    const [search,setSearch]=useState("");

    const handleSearch=()=>{
        console.log(" i am here");


    }





    return(
        <>
         <div className="search-area w-full  font-notoSans mt-4">
            <div className="w-10/12 mx-auto px-[2px] py-[2px] max-w-[600px] border rounded-full border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1 outline-none border-none text-sm" placeholder="search.." value={search} onChange={e=>setSearch(e.target.value)} />
               <button onClick={handleSearch} className="bg-[#f85607] px-2 text-sm  text-white rounded-full">Search</button>
            </div>

         </div>
        
        </>
    )

    



    


}

export default Home;