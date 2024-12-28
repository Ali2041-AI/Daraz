import { useForm } from "react-hook-form";
import images from "../assets/Images";
import { useNavigate } from "react-router";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, logOutUser } from "../store/darazSlice";
import { useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { LogInSeller, LogOutSeller, setStoreData, setUserAddresses } from '../store/darazSlice';

function AddressForm() {
    const userID = useSelector(state => state.userData.userData)?.$id;
    const userAddress = useSelector(state => state.userData.userAddresses);

    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            if (userAddress) {
                if (data.setDefault) {
                    let address = new Array();
                    address = (userAddress.address.map((item) => JSON.parse(item)));

                    const newAddress = address.map((item) => ({
                        ...item,
                        default: false,
                    }));

                    const newAddressToAdd = {
                        country: data.Country,
                        province: data.province,
                        city: data.city,
                        phoneNumber: data.phoneNumber,
                        completeAddress: data.completeAddress,
                        default: data.setDefault
                    };

                    newAddress.push(newAddressToAdd);

                    const stringifiedAddressArray = newAddress.map((item) => JSON.stringify(item));

                    const gotData = await sellerAccountService.updateAddressData(userAddress.$id, stringifiedAddressArray);
                    dispatch(setUserAddresses({ ...gotData }));
                } else {
                    console.log("here");
                    let address = new Array();
                    console.log(userAddress.address);

                    address = (userAddress.address.map((item) => JSON.parse(item)));

                    console.log("Here are the parsed Addresses: ", address);

                    const newAddressToAdd = {
                        country: data.Country,
                        province: data.province,
                        city: data.city,
                        phoneNumber: data.phoneNumber,
                        completeAddress: data.completeAddress,
                        default: data.setDefault
                    };

                    address.push(newAddressToAdd);

                    const stringifiedAddressArray = address.map((item) => JSON.stringify(item));

                    const gotData = await sellerAccountService.updateAddressData(userAddress.$id, stringifiedAddressArray);
                    dispatch(setUserAddresses({ ...gotData }));
                }
            } else {
                console.log("I am in the else section")
                const address = [JSON.stringify({
                    country: data.Country,
                    province: data.province,
                    city: data.city,
                    phoneNumber: data.phoneNumber,
                    completeAddress: data.completeAddress,
                    default: data.setDefault
                })]

                const gotData = await sellerAccountService.addAddress({ userID, address });
                dispatch(setUserAddresses({ ...gotData }));
            }

            navigate("/addressPage")
            setIsSubmitting(false);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    return (
        <>
            <div className="w-full font-notoSans">
                <div className="w-[97%] mx-auto mt-4 md:w-[80%] lg:w-[60%]">
                    <div>
                        <div className="mb-2">
                            <img className="pointer" onClick={() => navigate('/addressPage')} src={images.singleBack} alt="" />
                        </div>
                    </div>
                    <div className="ml-[2%] mb-5">
                        <div className="login-by-password-header text-[#2e3346] text-[5.6vw] md:text-[3vw] lg:text-[2vw] font-extrabold leading-[7.067vw]">Hi 👋</div>
                        <div className="login-by-password-header text-[#2e3346] mx-auto text-[5.6vw] md:text-[3vw] lg:text-[2vw] font-bold leading-[7.067vw]">Enter Your Complete Address</div>
                    </div>
                    <div className="flex flex-col justify-center items-center flex-1">
                        <svg className="lazada-logo-wrap-img mx-auto mb-6" width="100" height="100" xmlns="https://www.w3.org/2000/svg" fill="none">
                            <g>
                                <path stroke="null" id="svg_6" fill="#F85606" d="m71.69033,10.69231l-17.46332,-10.06967c-1.02025,-0.61711 -1.83699,-0.20519 -1.83699,1.02132l0,21.4708l17.36004,10.01866c1.02185,0.61724 1.02185,1.53357 0,2.14761l-15.52306,8.94813c-1.02025,0.61708 -1.83699,0.20511 -1.83699,-1.02137l0,-20.09303l-19.29571,11.14346c-0.77053,0.46273 -1.07874,0.97189 -1.07874,1.84051l0,21.36738c0,0.86862 0.3082,1.38851 1.07874,1.84051l18.22935,10.53102c0.77047,0.46273 1.37762,0.46273 2.14361,0l18.2293,-10.53102c0.77047,-0.46289 1.07869,-0.97189 1.07869,-1.84051l0,-44.93789c-0.01233,-0.86394 -0.31895,-1.37615 -1.08493,-1.8359z"></path>
                                <g stroke="null" id="svg_7">
                                    <path stroke="null" id="svg_1" fill="#F85606" d="m77.57747,97.00082l-3.51315,0l3.64196,-11.24148c0.10373,-0.33532 -0.07796,-0.56724 -0.41355,-0.56724l-7.56724,0c-0.31179,0 -0.49104,0.18054 -0.49104,0.49023l0,1.90952c0,0.31125 0.18081,0.48941 0.49104,0.48941l3.09953,0l-3.66386,11.24148c-0.10366,0.33538 0.07796,0.56724 0.43884,0.56724l7.98154,0c0.31186,0 0.49016,-0.18054 0.49016,-0.49023l0,-1.90945c-0.00407,-0.30894 -0.1844,-0.48948 -0.49423,-0.48948z"></path>
                                    <path stroke="null" id="svg_2" fill="#F85606" d="m68.15467,97.55084l0,-11.8854c0,-0.31057 -0.1802,-0.48914 -0.48928,-0.48914l-2.90788,0c-0.33477,0 -0.51491,0.18013 -0.51491,0.48914l0,1.02873l-0.28271,0c-0.25789,-1.08079 -1.02988,-1.698 -2.44497,-1.698c-2.13589,0 -3.34516,1.38899 -3.34516,5.99473l0,3.06136c0,4.605 1.18364,5.96836 3.34516,5.96836c1.54397,0 2.39372,-0.72053 2.6251,-2.05827l0.31071,0l0.33477,1.44024c0.07763,0.28338 0.25708,0.43789 0.54365,0.43789l2.70205,0c0.36033,0 0.48928,-0.23294 0.43728,-0.54351l-0.31382,-1.74614zm-3.91206,-2.72679c0,1.90301 -0.31071,2.31528 -1.05476,2.31528c-0.72073,0 -1.02988,-0.41226 -1.02988,-2.28965l0,-4.83706c0,-1.90383 0.33477,-2.31528 1.02988,-2.31528c0.74643,0 1.05476,0.41145 1.05476,2.34165l0,4.78506z"></path>
                                    <path stroke="null" id="svg_3" fill="#F85606" d="m56.92336,85.23732l-2.80354,2.00918l-0.18013,0l0,-1.54519c0,-0.31091 -0.18013,-0.48962 -0.48914,-0.48962l-2.75229,0c-0.31057,0 -0.48914,0.18027 -0.48914,0.48962l0,13.70075c0,0.31091 0.18013,0.48969 0.48914,0.48969l2.93242,0c0.33464,0 0.48914,-0.18034 0.48914,-0.48969l0,-8.21794l3.08692,-2.2144c0.23294,-0.18034 0.31057,-0.33498 0.31057,-0.59226l0,-2.83079c-0.00231,-0.3863 -0.28494,-0.54101 -0.59395,-0.30935z"></path>
                                    <path stroke="null" id="svg_4" fill="#F85606" d="m48.72027,97.55084l0,-11.8854c0,-0.31057 -0.17925,-0.48914 -0.48677,-0.48914l-2.88889,0c-0.33294,0 -0.51219,0.18013 -0.51219,0.48914l0,1.02873l-0.28128,0c-0.25572,-1.08079 -1.02371,-1.698 -2.43222,-1.698c-2.12477,0 -3.32773,1.38899 -3.32773,5.99473l0,3.06136c0,4.605 1.17747,5.96836 3.32773,5.96836c1.53597,0 2.38124,-0.72053 2.61147,-2.05827l0.30908,0l0.3322,1.44024c0.07729,0.28338 0.25654,0.43789 0.54087,0.43789l2.67717,0c0.3585,0 0.48677,-0.23294 0.43497,-0.54351l-0.3044,-1.74614zm-3.89172,-2.72679c0,1.90301 -0.30908,2.31528 -1.04927,2.31528c-0.717,0 -1.02371,-0.41226 -1.02371,-2.28965l0,-4.83706c0,-1.90383 0.3322,-2.31528 1.02371,-2.31528c0.74249,0 1.04927,0.41145 1.04927,2.34165l0,4.78506z"></path>
                                    <path stroke="null" id="svg_5" fill="#F85606" d="m31.42766,80.29285l-4.21938,0c-0.33464,0 -0.48914,0.18055 -0.48914,0.4895l0,18.61741c0,0.31125 0.15525,0.49023 0.48914,0.49023l4.21938,0c4.19294,0 6.12327,-1.90817 6.12327,-8.5098l0,-2.57826c0,-6.78143 -2.05847,-8.50908 -6.12327,-8.50908zm2.0064,12.89279c0,2.88794 -0.54351,3.45532 -1.9039,3.45532l-0.77185,0l0,-13.17378l0.77029,0c1.36343,0 1.9039,0.4903 1.9039,3.45532l0.00156,6.26313z"></path>
                                </g>
                            </g>
                        </svg>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[98%] md:w-[80%] lg:w-[60%]">
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <input className="border border-gray-400 px-2 py-2 mx-auto outline-[#1641B5] rounded-md w-full" type="text" {...register('Country', {
                                minLength: {
                                    value: 3,
                                    message: "At least 3 Characters!"
                                },
                                required: {
                                    value: true,
                                    message: "Country Missing!!"
                                }
                            })} placeholder="Country..." />
                            {errors.Country && (
                                <p className="text-red-500 text-[14px]">{errors.Country.message}</p>
                            )}

                            <input type="text"
                                {...register('province', {
                                    required: {
                                        value: true,
                                        message: "province is missing!!"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Province name must be at least 3 characters long!!'
                                    }
                                })}
                                className="border mx-auto border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" placeholder="Province..." />
                            {errors.province && (
                                <p className="text-red-500 text-[14px]">{errors.province.message}</p>
                            )}

                            <input type="text"
                                {...register('city', {
                                    required: {
                                        value: true,
                                        message: "City is missing!!"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'City name must be at least 3 characters long!!'
                                    }
                                })}
                                className="border mx-auto border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" placeholder="City..." />
                            {errors.city && (
                                <p className="text-red-500 text-[14px]">{errors.city.message}</p>
                            )}

                            <input type="number"
                                {...register('phoneNumber', {
                                    required: {
                                        value: true,
                                        message: "phoneNumber is missing!!"
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'Number must be at least 11 characters long!!'
                                    }
                                })}
                                className="border mx-auto border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" placeholder="Phone Number..." />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-[14px]">{errors.phoneNumber.message}</p>
                            )}

                            <input type="text"
                                {...register('completeAddress', {
                                    required: {
                                        value: true,
                                        message: "Complete Address is missing!!"
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'Complete Address must be at least 11 characters long!!'
                                    }
                                })}
                                className="border mx-auto border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md w-full" placeholder="Complete Address..." />
                            {errors.completeAddress && (
                                <p className="text-red-500 text-[14px]">{errors.completeAddress.message}</p>
                            )}

                            <div className="flex flex-row gap-8">
                                <label className="self-start text-sm opacity-75" htmlFor="defaultCheckBox">Set As Default?</label>
                                <input type="checkBox"
                                    {...register('setDefault', {})}
                                    id="defaultCheckBox" checked={true} className="border self-center border-gray-400 px-2 py-2 outline-[#1641B5] rounded-md" />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="text-white mb-6 bg-[#F85606] disabled:cursor-not-allowed disabled:bg-gray-700 w-full rounded-md py-3 font-semibold mx-auto">Add Address</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressForm;