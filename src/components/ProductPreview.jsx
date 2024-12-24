import { useSelector } from "react-redux";
import sellerAccountService from "../appwrite/sellerAccountService";
import { useNavigate } from "react-router";

function ProductPreview({products}){

  const navigate=useNavigate();





    return (
      <div className="container mx-auto mb-14 p-4">
        <div
          className="
            grid
            grid-cols-2    // 2 columns for mobile (default)
            sm:grid-cols-3 // 3 columns for small screens (640px and up)
            md:grid-cols-4 // 4 columns for medium screens (768px and up)
            lg:grid-cols-5 // 5 columns for large screens (1024px and up)
            xl:grid-cols-6 // 6 columns for extra-large screens (1280px and up)
            gap-4          // spacing between items
          "
        >
          {products.map((product) => (
            <div onClick={()=>navigate(`/productDisplay/${product.$id}`)} key={product.$id} className="bg-white shadow rounded overflow-hidden">
              {/* Product content */}
              <img  src={sellerAccountService.getImagePreview(product.productImages[0])} alt={product.name} className="w-full h-40" />
             <div className="px-2 py-1">
                <h2 className="text-sm  mt-2 truncate-text">{product.productTitle}</h2>
                <p className="text-[#fe4960] text-sm mb-1">Rs.{product.price}</p>
                <div className="flex gap-2"><svg className="star w-2"  viewBox="0 0 18 18" id="ic-star" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.00003 14.7625L13.0717 17.364C13.8221 17.8434 14.7778 17.1767 14.5868 16.3068L13.4891 11.3073L17.2126 7.88892C17.852 7.30194 17.4913 6.23496 16.6269 6.15638L11.7745 5.71529L9.92848 1.10135C9.59318 0.263304 8.40688 0.263303 8.07158 1.10135L6.22558 5.71529L1.37319 6.15638C0.508787 6.23496 0.148054 7.30194 0.787438 7.88892L4.51094 11.3073L3.41325 16.3068C3.22227 17.1767 4.17793 17.8434 4.92839 17.364L9.00003 14.7625Z" fill="#FFC83C"></path></svg>
                <p className="text-[11px]">
                 <span>4.9</span> <span className="text-gray-500">(320)</span>

                </p>
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>
    );



    

}
export default ProductPreview;