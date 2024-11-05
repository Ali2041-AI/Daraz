import { useEffect, useState } from "react";
import images from "../assets/Images";
import Customslider from "../components/custom.slider";
import imagesSlider from "../assets/ImageSlider";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";

function Home(){


    const [search,setSearch]=useState("");
    const [filteredTitles, setFilteredTitles] = useState([]);
    let filterdTitles=[];
    const navigate=useNavigate();
    let i="a";
    i.toLowerCase()

    const products=useSelector((state)=>state.userData.allProducts);



    const handleSearch=()=>{
        console.log(" i am here");
    }

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


   







    return(
        <>
        {/* top search area fixex */}
         <div className="search-area  z-50 bg-[#FAF6FC] w-full fixed top-0  font-notoSans py-3">
            <div className="w-[91%] mx-auto bg-white px-[2px] py-[2px] max-w-[600px] border-[0.7px] rounded-full border-[#FE4960] flex items-center justify-center overflow-hidden">
               <img src={images.searchIcon} className="w-6 mr-1" alt="" />
               <input type="text" className="flex-1 outline-none border-none text-sm" placeholder="search.." value={search} onChange={searchChange} />
               <button onClick={handleSearch} className="bg-[#f85607] px-2 py-1 text-sm  text-white rounded-full">Search</button>
            </div>
            {search && (
                    <div className="bg-white w-full font-notoSans text-sm font-semibold text-gray-900 h-auto">
                        <ul>
                            {filteredTitles.map((title, index) => (
                                <li key={index} className="p-2 border-b-[0.5px]">
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
         
         </div>
         {/* Image Slider  */}
         <div className="min-h-screen w-full pt-[65px] bg-[#F0F1F6] rounded-lg  overflow-hidden ">
            <div className="w-[91%] mx-auto max-w-[600px] rounded-lg overflow-hidden">
                <Customslider>
                    {imagesSlider.map((image,index)=>{
                        return <img src={image.img} alt={image.imgAlt} key={index} />
                    })}


                </Customslider>
            </div>

       
         {/* {productData.map((product)=>(
            <div key={product.$id}>
                <ProductPreview product={product} />
            </div>
         ))} */}
         <ProductPreview products={products} />

</div>

         
         {/* Footer fixed at the bottom */}

         <div className="w-full bg-white py-1 fixed bottom-0 font-notoSans">
            <div className="w-[81%] mx-auto max-w-[600px] flex justify-between items-center">
            <div className="flex flex-col items-center">
                <img src={images.darazLogo} className="w-6" alt=""  />
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
            <div className="flex flex-col items-center " onClick={()=>navigate('/account')}>
                <img src={images.account} className="w-6" alt="" />
                <p className="text-[10px] opacity-70">Account </p>
            </div>

            </div>
         </div>
        
        </>
    )

    



    


}

export default Home;