import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import images from "../assets/Images";

function Search(){




    const [search,setSearch]=useState("");
    const [filteredTitles, setFilteredTitles] = useState([]);
    let filterdTitles=[];
    const navigate=useNavigate();


    const products=useSelector((state)=>state.userData.allProducts);



    const searchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.trim() !== "") {
            const matchingTitles = products
                .filter((product) => product.productTitle.toLowerCase().includes(searchValue.toLowerCase()))
                .map((product) => product.productTitle);
            setFilteredTitles(matchingTitles); // Update state
            console.log(matchingTitles); // Log matching titles for debugging
        } else {
            setFilteredTitles([]); // Clear filteredTitles if search is empty
        }
    };


    const handleSearch=(e)=>{
        e.preventDefault();

        if(search.trim()!==""){
        navigate(`/searchProducts/${search}`)
       }

    }






    return(
        <>
        <div className="search-area  z-50 bg-[#FAF6FC] w-full fixed top-0  font-notoSans py-3">
            <form onSubmit={handleSearch}>

            <div className="w-[91%] mx-auto bg-white px-[2px] py-[2px] max-w-[600px] border-[0.7px] rounded-full border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={images.searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1 outline-none border-none text-sm" placeholder="search.." value={search} onChange={searchChange} />
               <button  type="submit"  className="bg-[#f85607] px-2 py-1 text-sm   text-white rounded-full">Search</button>
            </div>

            </form>
            {search && (
                    <div className="bg-white w-full font-notoSans text-sm font-semibold text-gray-900 h-auto">
                        <ul>
                            {filteredTitles.map((title, index) => (
                                <li onClick={()=>navigate(`/searchProducts/${title}`)}  key={index} className="p-2 border-b-[0.5px]">
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
         
         </div>
          
        </>
    )





}

export default Search;