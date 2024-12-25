import { useSelector } from "react-redux";
import images from "../assets/Images";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { Outlet, useLocation, useNavigate } from "react-router";
import DisplayProduct from "./DisplayProduct";

function StoreDashboard() {
    const storeData = useSelector((state) => state.userData.storeData);
    console.log(storeData);
    const refresher=useSelector((state)=>state.userData.refreshProducts);
    const storeID = storeData?.$id;
    const [productData, setProductData] = useState([]);
    const location = useLocation();
    const isLoginStoreDashboard = location.pathname === '/account/storeDashboard';

    const navigate = useNavigate();

    




    useEffect(() => {
        sellerAccountService.getSellerProductData(storeID)
            .then((res) => {
                setProductData(res.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [storeData,refresher]);

    return (
        <>
            {isLoginStoreDashboard ? (
                <div className="font-notoSans min-h-screen bg-gray-100 pb-20"> {/* Adjusted padding-bottom */}
                    {/* Header Section */}
                    <div className="bg-[#FF4100] text-white py-3 shadow-lg">
                        <div className="w-[97%] mx-auto flex items-center gap-3 py-2">
                            <img
                                className="cursor-pointer w-8 h-5"
                                onClick={() => navigate('/account')}
                                src={images.backIcon}
                                alt="Back"
                            />
                            <p className="font-semibold text-2xl">Seller Center</p>
                        </div>
                    </div>

                    <div className="w-[97%] mx-auto py-5">
                        {/* Page Title */}
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Store Dashboard</h2>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">My Products</h3>

                        {/* Product Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Product Title</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Stock</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Price</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Discounted Price</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Products Sold</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-700">Images</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.map((product) => (
                                        <DisplayProduct key={product.$id} product={product}  />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Add Product Button */}
                        <div className="mt-6 flex justify-end relative z-10">
                            <button
                                onClick={() => navigate('/account/storeDashboard/postProduct')}
                                className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-md text-white font-semibold shadow-lg"
                                style={{ marginBottom: '70px' }} // Ensure space from footer
                            >
                                Add New Product
                            </button>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="w-full fixed z-50 bottom-0 bg-white shadow-lg py-3">
                        <div className="w-[80%] mx-auto max-w-[600px] flex justify-between items-center text-gray-600">
                            <FooterIcon src={images.sellerProducts} label="Products" />
                            <FooterIcon src={images.revenue} label="Revenue" />
                            <FooterIcon src={images.orders} label="Orders" onClick={()=>navigate('/account/storeDashboard/orders')} />
                            <FooterIcon src={images.settings} label="Settings" onClick={() => navigate('/account')} />
                        </div>
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
}

function FooterIcon({ src, label, onClick }) {
    return (
        <div onClick={onClick} className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
            <img src={src} className="w-6 mb-1" alt={label} />
            <p className="text-xs">{label}</p>
        </div>
    );
}

export default StoreDashboard;
