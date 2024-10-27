import { useState } from "react";
import searchIcon from '../assets/search.png'

function Home(){


    const [search,setSearch]=useState("");

    const handleSearch=()=>{


    }





    return(
        <>
         <div className="search-area w-full font-notoSans mt-4">
            <div className="w-10/12 mx-auto px-[1px] py-[1px] border rounded-full border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1" placeholder="search.." value={search} onChange={e=>setSearch(e.target.value)} />
               <button onClick={handleSearch} className="bg-[#f85607] px-3 py-1 text-white rounded-full">Search</button>
            </div>

         </div>
        
        </>
    )

    



    


}

export default Home;