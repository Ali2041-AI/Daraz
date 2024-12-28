import { useParams } from "react-router";
import Search from "../components/Search";
import ProductPreview from "../components/ProductPreview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SearchedProducts(){

    const products=useSelector((state)=>state.userData.allProducts);


    const {title}=useParams();
    const [filtredProducts,setFilterdProducts]=useState([]);
    useEffect(()=>{

        setFilterdProducts(products.filter((product)=>product.productTitle.toLowerCase().trim().includes(title.trim().toLowerCase())));

    
    },[title])


return(
    <>
    <Search />
    <div className="mb-12 md:mb-44">

    </div>
    <ProductPreview products={filtredProducts}  />
    </>
)




}

export default SearchedProducts;