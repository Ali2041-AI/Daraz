import { useForm } from "react-hook-form";
import images from "../assets/Images";
import { useNavigate } from "react-router";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, logOutUser } from "../store/darazSlice";
import { useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { LogInSeller, LogOutSeller, setStoreData, changeRefreshProducts } from '../store/darazSlice';

function PostProduct() {
    const [imageLimitError, setImageLimitError] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const storeData = useSelector((state) => state.userData.storeData);
    const storeID = storeData?.$id;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imageCount, setImageCount] = useState(1);
    const { register, handleSubmit, getValues, setValue, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            ProductImages: [],
            category: [],
            colors: [],
            sizes: [],
        }
    });

    register("ProductImages");
    register("category");
    register("colors");
    register("sizes");

    watch('category');
    watch('colors');
    watch('sizes');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [productImage, setProductImage] = useState([]);

    const onSubmit = async (data) => {
        console.log("here inside submit")
        setIsSubmitting(true);

        try {
            const productData = await sellerAccountService.createNewProduct({
                productTitle: data.productTitle,
                discountedPrice: data.discountedPrice,
                stock: data.stock,
                colors: data.colors,
                sizes: data.sizes,
                category: data.category,
                price: data.price,
                description: data.description,
                productImages: data.ProductImages,
                storeID
            });
            dispatch(changeRefreshProducts());
            navigate('/account/storeDashboard');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }

        setIsSubmitting(false);
        reset();
    }

    const addImage = () => {
        setImageLimitError(false);
        if (productImages.length > 3) {
            setImageLimitError(true);
            return;
        }
        if (imageCount > 5) {
            setImageLimitError(true);
            return;
        }
        sellerAccountService.addImage(productImage)
            .then((fileID) => {
                const arr = getValues('ProductImages');
                const updatedArray = [...arr, fileID];
                setValue('ProductImages', updatedArray);
                setProductImages(updatedArray);
            })
            .catch((error) => {
                console.log(error);
            });

        setProductImage([]);
    }

    const addCategory = () => {
        if (getValues('singleCategory').trim() !== "") {
            const arr = getValues('category');
            const updatedArray = [...arr, getValues('singleCategory')];
            setValue('category', updatedArray);
        }
        setValue('singleCategory', "");
    }

    const addColors = () => {
        if (getValues('singleColor').trim() !== "") {
            const arr = getValues('colors');
            const updatedArray = [...arr, getValues('singleColor')];
            setValue('colors', updatedArray);
            console.log(getValues('colors'));
        }
        setValue('singleColor', "");
    }

    const addSizes = () => {
        if (getValues('singleSize').trim() !== "") {
            const arr = getValues('sizes');
            const updatedArray = [...arr, getValues('singleSize')];
            setValue('sizes', updatedArray);
            console.log(getValues('sizes'));
        }
        setValue('singleSize', "");
    }

    return (
        <>
            <div className="w-full font-notoSans">
                <div className="w-[97%] mx-auto mt-4 md:w-[80%] lg:w-[60%]">
                    <div>
                        <div className="mb-5">
                            <img className="pointer" onClick={() => navigate('/account/storeDashboard')} src={images.singleBack} alt="" />
                        </div>
                    </div>
                    <div className="ml-[2%] mb-10">
                        <div className="login-by-password-header text-[#2e3346] text-[5.6vw] md:text-[3vw] lg:text-[2vw] font-bold leading-[7.067vw]">Add New Product</div>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-1">
                        <img className="w-36 mb-4" src="https://img.alicdn.com/imgextra/i3/O1CN01ovcTAV1WBY7oOmozh_!!6000000002750-55-tps-323-127.svg" alt="" />
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-10 gap-5 w-[98%] md:w-[80%] lg:w-[60%]">
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <input className="border border-gray-400 px-2 py-2 mx-auto outline-[#1641B5] rounded-md w-full" type="text" {...register('productTitle', {
                                required: {
                                    value: true,
                                    message: "Product Name is Missing!!"
                                }
                            })} placeholder="Product Name..." />
                            {errors.productTitle && (
                                <p className="text-red-500 text-[14px]">{errors.productTitle.message}</p>
                            )}

                            <input className="border border-gray-400 px-2 py-2 mx-auto outline-[#1641B5] rounded-md w-full" type="text" {...register('price', {
                                required: {
                                    value: true,
                                    message: "Price is Missing!!"
                                }
                            })} placeholder="Product Price..." />
                            {errors.price && (
                                <p className="text-red-500 text-[14px]">{errors.price.message}</p>
                            )}

                            <input className="border border-gray-400 px-2 py-2 mx-auto outline-[#1641B5] rounded-md w-full" type="text" {...register('discountedPrice')} placeholder="Product Discounted Price..." />
                            {errors.discountedPrice && (
                                <p className="text-red-500 text-[14px]">{errors.discountedPrice.message}</p>
                            )}

                            <input className="border border-gray-400 px-2 py-2 mx-auto outline-[#1641B5] rounded-md w-full" type="text" {...register('stock', {
                                required: {
                                    value: true,
                                    message: "Stock is Missing!!"
                                }
                            })} placeholder="Product Stock..." />
                            {errors.stock && (
                                <p className="text-red-500 text-[14px]">{errors.stock.message}</p>
                            )}

                            <div className="border-2 rounded-md px-2 py-2">
                                <label htmlFor="images">Upload Product Images</label>
                                <div className="flex gap-8 items-center">
                                    <input className="w-52" type="file" accept="image/png, image/jpg, image/webp, image/jpeg, image/gif" onChange={e => setProductImage(e.target.files[0])} />
                                    <button type="button" onClick={addImage} className="bg-red-600 w-14 h-14 rounded-full text-3xl hover:bg-red-500 text-white">+</button>
                                </div>
                                <div className="flex gap-8">
                                    {Array.isArray(productImages) && productImages.map((imageID) => (
                                        <img key={imageID} className="w-12 h-12" src={sellerAccountService.getImagePreview(imageID)} alt="" />
                                    ))}
                                </div>
                                {imageLimitError ? <p className="text-red-500 text-sm">Only Upload 4 Images!!</p> : ""}
                            </div>

                            <div className="CateogoryArea border-2 rounded-md px-2 py-2">
                                <label htmlFor="productCategory">Product Category</label>
                                <div className="flex gap-8 mb-3 items-center">
                                    <input id="productCategory" className="border max-w-52 border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" type="text" {...register('singleCategory')} placeholder="Product Category..." />
                                    {errors.singleCategory && (
                                        <p className="text-red-500 text-[14px]">{errors.singleCategory.message}</p>
                                    )}
                                    <button type="button" onClick={addCategory} className="bg-red-600 w-14 h-14 rounded-full text-3xl hover:bg-red-500 text-white">+</button>
                                </div>
                                <div className="flex gap-8">
                                    {Array.isArray(getValues('category')) && getValues('category').map((category) => (
                                        <p key={category}>{category}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="ColorArea border-2 rounded-md px-2 py-2">
                                <label htmlFor="colorArea">Product Colors</label>
                                <div className="flex gap-8 mb-3 items-center">
                                    <input id="colorArea" className="border max-w-52 border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" type="text" {...register('singleColor')} placeholder="Product Color..." />
                                    {errors.singleColor && (
                                        <p className="text-red-500 text-[14px]">{errors.singleColor.message}</p>
                                    )}
                                    <button type="button" onClick={addColors} className="bg-red-600 w-14 h-14 rounded-full text-3xl hover:bg-red-500 text-white">+</button>
                                </div>
                                <div className="flex gap-8">
                                    {Array.isArray(getValues('colors')) && getValues('colors').map((colors) => (
                                        <p key={colors}>{colors}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="sizeArea border-2 rounded-md px-2 py-2">
                                <label htmlFor="sizeArea">Product Sizes</label>
                                <div className="flex gap-8 mb-3 items-center">
                                    <input id="sizeArea" className="border max-w-52 border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" type="text" {...register('singleSize')} placeholder="Product Sizes..." />
                                    {errors.singleSize && (
                                        <p className="text-red-500 text-[14px]">{errors.singleSize.message}</p>
                                    )}
                                    <button type="button" onClick={addSizes} className="bg-red-600 w-14 h-14 rounded-full text-3xl hover:bg-red-500 text-white">+</button>
                                </div>
                                <div className="flex gap-8">
                                    {Array.isArray(getValues('sizes')) && getValues('sizes').map((size) => (
                                        <p key={size}>{size}</p>
                                    ))}
                                </div>
                            </div>

                            <textarea type="text" {...register('description', {
                                required: {
                                    value: true,
                                    message: "Description is missing!!"
                                },
                                minLength: {
                                    value: 80,
                                    message: 'Description must be at least 80 characters long!!'
                                }
                            })} className="border mx-auto h-44 border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" placeholder="Description...." />
                            {errors.description && (
                                <p className="text-red-500 text-[14px]">{errors.description.message}</p>
                            )}

                            <button type="submit" disabled={isSubmitting} className="text-white bg-[#F85606] disabled:cursor-not-allowed disabled:bg-gray-700 w-full rounded-md py-3 font-semibold mx-auto">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostProduct;