import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import store from "../store/store";
import { useLocation, useNavigate } from "react-router";
import images from "../assets/Images";

function SellerOrder(){


    const storeData=useSelector((state)=>state.userData.storeData);
    const storeID=storeData?.$id;
    const [orders, setOrders] = useState([]);
    console.log("these are the orders: ",orders);
    const location = useLocation();
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);

    //get data from location state
    const {productData}=location.state || {};
    console.log(productData);

    useEffect(() => {

       sellerAccountService.getOrders("storeID",storeID)
       .then((res)=>{
        setOrders(res.documents)

        const orders=res.documents.map((order)=>{
              
          const matchedProduct=productData.find((product)=>product.$id===order.productID);
          if(matchedProduct){
            return {...order,productName:matchedProduct?.productTitle,productImage:matchedProduct?.productImages[0],
              sold:matchedProduct?.sold,stock:matchedProduct?.stock
            };
          }
        })
        setOrders(orders);
        
       })


     }, [storeData])


     const markShipped = (orderID,sold,stock,quantity) => {
        if (orderID) {
            sellerAccountService.updateOrderStatus(orderID, "shipped")
                .then((res) => {
                    console.log(res);
                    if (res.$id) {
                        const updatedOrders = orders.map((order) => {
                            if (order.$id === orderID) {
                                return { ...order, orderStatus: "shipped" };
                            }
                            return order;
                        });
                        sellerAccountService.updateProductData(res.productID,sold+quantity,stock-quantity)
                        setOrders(updatedOrders);
                    }
                });
        }
    };
     





     return (
      <>
         <div className="nav-area">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/account/storeDashboard")} />
                        <p className="font-bold mt-1">My Orders</p>
                    </div>
                </div>
            </div>
      
        <div className="container mx-auto pt-14 p-6">
          <h2 className="text-2xl font-bold mb-4">Seller's Order Section</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                 <th className="px-4 py-2 text-left">Product Name</th>
                 <th className="px-4 py-2 text-left">Product </th>
                  <th className="px-4 py-2 text-left">Order Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const address = JSON.parse(order.orderAddress);
                  return (
                    <tr key={order.$id} className="border-t">
                      <td className="px-4 py-2">{order?.productName}</td>
                      <td><img className=" min-w-0 w-14 rounded-lg " src={sellerAccountService.getImagePreview(order?.productImage)}  />    </td>
                      <td className="px-4 py-2">{order.orderDate}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            order.orderStatus === 'processing' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">
                        {address.city}, {address.province}, {address.country}
                      </td>
                      <td className="px-4 py-2 flex flex-col">
                        <button onClick={()=>markShipped(order?.$id,order?.sold,order?.stock,order.quantity)} className={`bg-blue-500 ${order?.orderStatus==="shipped"?"hidden":""} text-white  px-4 py-2 rounded-lg`}>Mark as Shipped</button>
                        <button onClick={()=>markShipped(order?.$id)} className={`bg-blue-500 ${order?.orderStatus!=="shipped"?"hidden":""} text-white  px-4 py-2 rounded-lg`}>Shipped</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </>

      );



}

export default SellerOrder;