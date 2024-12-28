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
    const userData=useSelector((state)=>state.userData?.userData);
    const storeData=useSelector((state)=>state.userData.storeData);



    const searchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.trim() !== "") {
            const matchingTitles = products
                .filter((product) => product.productTitle.toLowerCase().includes(searchValue.toLowerCase()))
                .map((product) => product.productTitle);
            setFilteredTitles(matchingTitles); // Update state
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
        <div className="search-area     z-10 bg-[#FAF6FC] md:bg-[#f85607]  w-full fixed top-0  font-notoSans py-3">
            
            <form onSubmit={handleSearch}>


              
         <div className="justify-between hidden md:flex items-center" >
            <img src={images.darazBiggerlogo}  onClick={()=>navigate('/')} className="w-44 hidden md:block cursor-pointer"  alt="" />    
            <div className="text-white flex gap-4 mr-4 font-bold tracking-wider">
                <p onClick={()=>navigate('/')}  className="cursor-pointer">Home</p>
                <p onClick={()=>navigate('/cart')} className="cursor-pointer">Cart</p>
                <p onClick={()=>navigate('/account/loginSignup/login')} className={`cursor-pointer ${userData?"hidden":""}`}>Login</p>
                <p onClick={()=>navigate('account/loginSignup/signup')} className={`cursor-pointer ${userData?"hidden":""}`}>Signup</p>
                <p onClick={()=>navigate('/account/storeDashboard')} className={`cursor-pointer ${!storeData?"hidden":""}`}>Store Dashboard</p>
                <p onClick={()=>navigate('/account')} className="cursor-pointer">Account</p>

            </div>
         </div>

            <div className="w-[91%] mx-auto bg-white px-[2px] py-[2px] max-w-[600px] border-[0.7px] rounded-full md:rounded-md   border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={images.searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1 outline-none border-none text-sm" placeholder="Search in Daraz" value={search} onChange={searchChange} />
               <button  type="submit"  className="bg-[#f85607] px-2 py-1 text-sm md:hidden   text-white rounded-full">Search</button>
               <button type="submit"> <img src={images.mdSearch}  className="hidden md:block" alt="" /> </button>
            </div>
            

            </form>
            {search && (
                    <div className="bg-white absolute left-[50%] -translate-x-[50%]  w-full  md:w-[91%] md:max-w-[600px] mx-auto font-notoSans text-sm font-semibold text-gray-900 h-auto">
                        <ul>
                            {filteredTitles.map((title, index) => ( 

                                <li onClick={()=>navigate(`/searchProducts/${title}`)}  key={index} className="p-2 truncate-textLine  border-b-[0.5px]">
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