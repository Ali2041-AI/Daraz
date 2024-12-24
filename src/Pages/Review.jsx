import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
import images from "../assets/Images";

function Review() {
    const userData = useSelector((state) => state.userData?.userData);
    const { productID } = useParams();
    const [productData, setProductData] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate(); 

    useEffect(() => {
        if (userData) {
            sellerAccountService.getProductData(productID).then((res) => {
                if (res.total > 0) {
                    setProductData(res.documents[0]);
                }
            });
        }
    }, [userData]);

    const handleImageUpload = async (file) => {
        console.log("Uploading image:", file);
        try {
            setUploading(true);
            const response = await sellerAccountService.addImage(file);
            setUploadedImages((prevImages) => [...prevImages, response]);
            fileInputRef.current.value = null;
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleImageRemove = (imageID) => {
        setUploadedImages((prevImages) => prevImages.filter((id) => id !== imageID));
        sellerAccountService.deleteImage(imageID);
    };

    const handleSubmitReview = () => {
        setLoading(true)
       const reviewStars=ratingValue.toString();
       const name=userData.name;
       const userID=userData.$id;
       const productID=productData.$id;
       const reviewImages=uploadedImages;
       if(reviewStars && reviewText && name && userID && productID){


         sellerAccountService.createReview({reviewText,reviewStars,name,userID,productID,reviewImages})
         .then((res)=>{
            console.log(res);
            setLoading(false);
         })

        }
        else{
            setLoading(false);
            setLoading(false);
        }
      //a
        // Add logic to submit the review
    };

    return (
        <>
        <div className="nav-area">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/orders")} />
                        <p className="font-bold mt-1">Write a review</p>
                    </div>
                </div>

         </div>       
            <div className=" pt-16 px-3 pb-4 ">
            
                {/* Product Display */}
                <div className="flex gap-4 ">
                    {productData?.productImages && productData?.productImages.length > 0 && (
                        <img
                            src={sellerAccountService.getImagePreview(productData?.productImages[0])}
                            className="rounded-md"
                            alt="Product"
                        />
                    )}
                    <div>
                        <p className="truncate-text text-lg font-bold tracking-wide">{productData?.productTitle}</p>
                        <p className="text-[#F85606] font-bold text-lg">Rs. {productData?.discountedPrice}</p>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex flex-col gap-4 mt-4">
                    <div>
                        <p className="text-lg font-bold">Rate the Product</p>
                        <Stack spacing={1}>
                            <Rating
                                name="product-rating"
                                value={ratingValue}
                                onChange={(event, newValue) => setRatingValue(newValue)}
                            />
                        </Stack>
                    </div>

                    {/* Review Text */}
                    <div>
                        <p className="text-lg font-bold">Review</p>
                        <textarea
                            className="w-full h-36 border border-gray-200 rounded-md p-2"
                            placeholder="Write your review here"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="mt-4">
                
                    <div className="flex items-center gap-4">
                        {/* Custom File Upload Button */}
                        <div>
                        <p className="text-lg font-bold mb-2">Upload Images</p>
                        <label 
                            htmlFor="upload-images" 
                            className="cursor-pointer flex items-center gap-2 text-[#F85606] font-bold py-2 px-4 border border-[#F85606] rounded-md w-fit"
                        >
                            <span>+ Add Images</span>
                        </label>

                        </div>
                        <input
                            id="upload-images"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            disabled={uploading}
                            ref={fileInputRef}
                            className="hidden" // Hide the default input
                        />
                        {uploading && <p className="text-sm self-start pt-1 text-gray-500">Uploading...</p>}
                    </div>

                    {/* Display Uploaded Images */}
                    <div className="flex gap-4 flex-wrap mt-2">
                        {uploadedImages?.map((imageID, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={sellerAccountService.getImagePreview(imageID)}
                                    alt="Uploaded"
                                    className="w-24 h-24 rounded-md object-cover"
                                />
                                <button
                                    onClick={() => handleImageRemove(imageID)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className={`mt-4 bg-[#F85606] ${loading?"bg-gray-600":""} text-white px-4 py-2 rounded-md`}
                    disabled={loading}
                    onClick={handleSubmitReview}
                >
                    Submit Review
                </button>
            </div>

            
        </>
    );
}

export default Review;
