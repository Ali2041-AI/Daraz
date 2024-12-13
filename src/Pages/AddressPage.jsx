import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import sellerAccountService from "../appwrite/sellerAccountService";
import { setUserAddresses } from "../store/darazSlice";
import images from "../assets/Images";

function AddressPage() {
  const userID = useSelector((state) => state.userData)?.loginStatus;
  const userAddresses = useSelector((state) => state.userData)?.userAddresses;


   

  const dispatch=useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  

  const queryParams = new URLSearchParams(location.search);
  const productID = queryParams.get("productID");
  const isLoginSignupRoute = location.pathname === "/addressPage/addressForm";

  // Extract the address array from the userAddresses record
  const addressArray = userAddresses?.address?.map((item) => JSON.parse(item));

  // Use state to store selected address index
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  // On initial render or when the addresses change, set default selection
  useEffect(() => {
    if (addressArray && addressArray.length > 0 && selectedAddressIndex === null) {
      const defaultIndex = addressArray.findIndex((address) => address.default);
      setSelectedAddressIndex(defaultIndex !== -1 ? defaultIndex : 0); // Set to the default address or first address if none is default
    }
  }, [addressArray, selectedAddressIndex]);

  // Handle radio button change
  const handleAddressChange = async (index) => {
    setSelectedAddressIndex(index);

    const newAddress = addressArray.map((item,i) => index===i?({
        ...item,
        default: true,
      }) :({...item,default:false}) );

      const stringifiedAddressArray = newAddress.map((item) => JSON.stringify(item));
      const gotData=  await sellerAccountService.updateAddressData(userAddresses.$id,stringifiedAddressArray);
      console.log(gotData);
      dispatch(setUserAddresses({...gotData})); 
  };

  return (
    <>
      {isLoginSignupRoute ? (
        <Outlet />
      ) : (
        <div>
          {userID ? (
            <div>
            <div className="flex items-center p-3 gap-3 ">
               <img src={images.backIcon} className="w-4 " onClick={()=>navigate(`/productDisplay/${productID}`)} />
               <h2 className="text-lg font-bold">Select Your Address</h2>  
            </div>    
              <div className="space-y-4">
                {addressArray?.map((address, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md flex items-start space-x-4"
                  >
                    <input
                      type="radio"
                      name="address"
                      id={`address-${index}`}
                      checked={selectedAddressIndex === index}
                      onChange={() => handleAddressChange(index)}
                      className="mt-1"
                    />
                    <label htmlFor={`address-${index}`} className="flex-1">
                      <p className="font-medium">{address.completeAddress}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.province}, {address.country}
                      </p>
                      <p className="text-sm text-gray-600">Phone: {address.phoneNumber}</p>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex mt-6">
                <button
                  className="bg-[#F85606] text-white px-4 py-2 font-bold rounded-md mx-auto"
                  onClick={() => navigate("addressForm")}
                >
                  Add New Address
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen w-full">
              <p className="opacity-70">Login First!!</p>
              <button
                className="bg-blue-600 text-white rounded-full px-4 font-bold py-2"
                onClick={() => navigate("/account/loginSignup")}
              >
                Login/Signup
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AddressPage;
