import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import images from "../assets/Images";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";

function ProductsByCategory() {
  const { categoryName } = useParams();
  const allProducts=useSelector((state)=>state.userData.allProducts);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();


  useEffect(() => { 

    getFiltredProducts();
  
  }, [])


  const getFiltredProducts=()=>{

    const filtredProducts=allProducts.filter((product)=>{
        const category=product.category;
        console.log(category);
        if(category.some((categ)=>categ.toLowerCase()===categoryName.toLowerCase())){
            return product;
        }
    })
    setProducts(filtredProducts);
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#F85606" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
  <div>
      <div className="nav-area">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/category")} />
                        <p className="font-bold mt-1">Back</p>
                    </div>
                </div>

         </div>    

    <div className="products-container">
      <h1 className="text-2xl font-bold mb-4">
        Products in "{categoryName}"
      </h1>
      {
        products.length!==0
        ?
        <div>
            <ProductPreview products={products} /> {/* Pass products to your existing component */}
        </div>
        :
        <p className="absolute top-[50%] left-[50%] -translate-x-[50%] text-[#] font-bold" >No Products Found</p>
    }

    </div>
  </div>  

  );
}

export default ProductsByCategory;
