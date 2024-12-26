import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import images from '../assets/Images';


const RevenuePage = () => {

   const location=useLocation(); 
   const {productData}=location.state || {};
   const navigate=useNavigate();

   






  const calculateTotalRevenue = () => {
    return productData.reduce((total, product) => total + product.discountedPrice * product.sold, 0);
  };

  return (

    <>
     <div className="nav-area">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/account/storeDashboard")} />
                        <p className="font-bold mt-1">Revenue</p>
                    </div>
                </div>
            </div>
    
    <div className="container mx-auto p-6 pt-14">
      <h2 className="text-2xl font-bold mb-4">Revenue Page</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Price (PKR)</th>
              <th className="px-4 py-2 text-left">Units Sold</th>
              <th className="px-4 py-2 text-left">Revenue (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {productData.map(product => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.productTitle}</td>
                <td className="px-4 py-2">{product.discountedPrice}</td>
                <td className="px-4 py-2">{product.sold?product.sold:0}</td>
                <td className="px-4 py-2 font-semibold">
                  {product.discountedPrice * product.sold}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">
          Total Revenue: PKR {calculateTotalRevenue()}
        </h3>
      </div>
    </div>
    </>

  );
};

export default RevenuePage;
