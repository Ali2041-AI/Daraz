import { useNavigate } from "react-router-dom";
import images from "../assets/Images";
function CategoriesPage() {
  const navigate = useNavigate();

  const categories = ["Electronics", "Fashion", "Home Appliances", "Books"]; // Replace with dynamic fetching if needed

  return (
    <>
     <div className="nav-area">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/")} />
                        <p className="font-bold mt-1">Categories</p>
                    </div>
                </div>

         </div>       

    <div className="categories-container p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
            onClick={() => navigate(`/categories/${category}`)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>

    </>

  );
}

export default CategoriesPage;
