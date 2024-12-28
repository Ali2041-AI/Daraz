import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { useNavigate } from "react-router";


function QuerieReply({ querie,setRerender }) {
    const [product, setProduct] = useState([]);
    const [sellerReply, setSellerReply] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (querie) {
            sellerAccountService.getProductData(querie?.productID)
                .then((res) => {
                    setProduct(res.documents[0]);
                })
        }
    }, [querie]);

    const sendReply = () => {
        if (sellerReply.trim() !== "") {
            sellerAccountService.sendCustomerQuerieReply(querie?.$id, sellerReply, true)
                .then((res) => {
                    console.log(res);
                    setRerender(true);
                })
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg bg-white">
            <div className="flex flex-col gap-2">
                <p className="tracking-wider md:text-lg text-gray-800">{querie.querie}</p>
                {
                    product.length !== 0 &&
                    <img src={sellerAccountService.getImagePreview(product?.productImages[0])} alt="Product" className="w-20 rounded-lg" />
                }
            </div>
            <div className="flex flex-col gap-2">
                <textarea className="w-full p-2 border border-gray-300 rounded-md resize-vertical" value={sellerReply} onChange={e => setSellerReply(e.target.value)} placeholder="Type your reply here..."></textarea>
                <button className="self-end px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500" onClick={sendReply}>Send Reply</button>
            </div>
        </div>
    )
}

export default QuerieReply;