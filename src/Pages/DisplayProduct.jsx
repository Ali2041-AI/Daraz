import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";

function DisplayProduct({ product }) {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        const fetchImagePreviews = async () => {
            const imagesArray = await Promise.all(product.productImages.map(async (imageId) => {
                return sellerAccountService.getImagePreview(imageId);
            }));
            setProductImages(imagesArray);
        };

        fetchImagePreviews();
    }, [product.productImages]);

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="px-6 py-3 text-gray-800">{product.productTitle}</td>
            <td className="px-6 py-3 text-gray-800">{product.stock}</td>
            <td className="px-6 py-3 text-gray-800">${product.price}</td>
            <td className="px-6 py-3 text-gray-800">${product.discountedPrice}</td>
            <td className="px-6 py-3 text-gray-800">{product.sold?product.sold:'0'}</td>
            <td className="px-6 py-3">
                <div className="flex gap-2">
                    {productImages.map((imageSrc, index) => (
                        <img
                            key={index}
                            src={imageSrc}
                            alt="Product"
                            className="w-16 h-16 object-cover border border-gray-200 rounded-md shadow-sm"
                        />
                    ))}
                </div>
            </td>
        </tr>
    );
}

export default DisplayProduct;
