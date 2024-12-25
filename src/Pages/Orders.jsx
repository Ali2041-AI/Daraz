import { useNavigate } from "react-router";
import images from "../assets/Images";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import { ClipLoader } from "react-spinners";

function Orders() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData)?.userData;

  const [orders, setOrders] = useState([]);
  const [orderProductsData, setOrderProductsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true); // New state

  useEffect(() => {
    setLoading(true);
    setLoadingUserData(true); // Start loading user data
    setError(null); // Reset errors on each mount

    if (!userData) {
      setLoadingUserData(false); // Finished checking userData
      setError("Please Login First");
      setLoading(false);
      return;
    }

    setLoadingUserData(false); // User data is available
    sellerAccountService
      .getOrders("userID", userData.$id)
      .then((res) => {
        if (res.total > 0) {
          setOrders(res.documents);
          const allOrders = res.documents;

          const productsIDs = allOrders.map((order) => order.productID);

          sellerAccountService.getProductData(productsIDs).then((res) => {
            if (res.total > 0) {
              const updatedOrderProductsData = res?.documents.map((product) => {
                const matchedOrder = allOrders.find(
                  (order) => order.productID === product.$id
                );
                return matchedOrder
                  ? {
                      ...product,
                      quantity: matchedOrder.quantity,
                      orderStatus: matchedOrder.orderStatus,
                    }
                  : null;
              });

              setOrderProductsData(updatedOrderProductsData.filter(Boolean)); // Remove null entries
            } else {
              setError("No Products Found");
            }
            setLoading(false);
          });
        } else {
          setError("No Orders Found");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Failed to fetch orders.");
        setLoading(false);
      });
  }, [userData]);

  if (loadingUserData) {
    // Show a spinner or message while userData is being determined
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#F85606" size={50} />
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#F85606" size={50} />
        </div>
      ) : (
        <div className="bg-[#F0F1F6] min-h-screen">
          <div className="nav-area">
            <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={images.backIcon}
                  className="w-5 font-bold"
                  alt=""
                  onClick={() => navigate("/account")}
                />
                <p className="font-bold mt-1">My Orders</p>
              </div>
            </div>
          </div>

          <div className="pt-12">
            {Array.isArray(orderProductsData) &&
              orderProductsData.map((product, index) => (
                <div key={index}>
                  <Product product={product} orderDisplay={true} />
                </div>
              ))}
          </div>

          {error && (
            <p className="errors absolute top-[50%] left-[50%] -translate-x-[50%] font-bold text-[#F85606]">
              {error}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Orders;
