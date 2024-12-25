import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import store from "../store/store";

function SellerOrder(){


    const storeData=useSelector((state)=>state.userData.storeData);
    const storeID=storeData?.$id;
    const [orders, setOrders] = useState([]);

    useEffect(() => {

       sellerAccountService.getOrders("storeID",storeID)
       .then((res)=>{
        setOrders(res.documents);
       })


     }, [storeData])


     const markShipped = (orderID) => {
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
                        setOrders(updatedOrders);
                    }
                });
        }
    };
     





     return (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Seller's Order Section</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
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
                    <tr key={order.id} className="border-t">
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
                        <button onClick={()=>markShipped(order?.$id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Mark as Shipped</button>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );



}

export default SellerOrder;