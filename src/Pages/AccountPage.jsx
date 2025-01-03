import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import images from '../assets/Images';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/authService';
import { logInUser, logOutUser } from '../store/darazSlice';

function Account() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginSignupRoute = location.pathname === '/account';
    const logInStatus = useSelector((state) => state.userData.loginStatus);
    const logInUserName = useSelector((state) => state.userData.userData)?.name;
    const storeData = useSelector((state) => state.userData.storeData);
    const isSeller = useSelector((state) => state.userData.isSeller);
    const dispatch = useDispatch();

    const goBack = () => {
        navigate('/');
    }

    const handleLogInLogOut = () => {
        if (logInStatus) {
            authService.logOutUser()
                .then(() => {
                    dispatch(logOutUser());
                    navigate('/')
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate('/account/loginSignup')
        }
    }

    const navigateStore = () => {
        if (storeData) {
            navigate('/account/storeDashboard');
        } else if (isSeller) {
            navigate('/account/storeCreation');
        } else if (logInStatus && isSeller === false) {
            navigate('/account/sellerCreation');
        } else {
            navigate('/account/loginSignup');
        }
    }

    return (
        <>
            <div className='wrapper'>
                {
                    isLoginSignupRoute ?
                        <div className='md:mt-32'>
                            <div className='wrapper w-full font-notoSans min-h-screen bg-[#EFF0F5]'>
                                <nav className="py-3 bg-[#F86306] w-full md:hidden">
                                    <div className='flex items-center gap-4 w-[97%] mx-auto'>
                                        <img src={images.backIcon} alt="" className='w-6' onClick={goBack} />
                                        <p className='text-black'>My Account</p>
                                    </div>
                                </nav>
                                <div className='opacity-90 py-2 mb-2 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex justify-between items-center'>
                                        <p>
                                            Hello, Welcome {logInStatus ? logInUserName : 'to Daraz'}!
                                        </p>
                                        <button onClick={() => handleLogInLogOut()} className='text-white bg-[#F86306] rounded-md px-2 py-2'>
                                            {logInStatus ? 'LOGOUT' : 'LOGIN/SIGNUP'}
                                        </button>
                                    </div>
                                </div>
                                <div onClick={() => navigate("/orders")} className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.MyOrders} alt="" />
                                        <p className='text-[16px] opacity-95'>My Orders</p>
                                    </div>
                                </div>
                                <div className='opacity-90 py-3 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.FollowedStore} alt="" />
                                        <p className='text-[16px] opacity-95'>My Wishlist & Followed Stores</p>
                                    </div>
                                </div>
                                <div onClick={navigateStore} className='opacity-90 py-2 mb-2 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.sellerIcon} className='w-6' alt="" />
                                        <p className='text-[16px] opacity-95'>{storeData ? 'Seller Dashboard' : isSeller ? 'Create Store' : 'Create Seller Account'}</p>
                                    </div>
                                </div>
                                <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.Policies} alt="" />
                                        <p className='text-[16px] opacity-95'>Policies</p>
                                    </div>
                                </div>
                                <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.Feedback} alt="" />
                                        <p className='text-[16px] opacity-95'>Feedback</p>
                                    </div>
                                </div>
                                <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.Help} alt="" />
                                        <p className='text-[16px] opacity-95'>Help</p>
                                    </div>
                                </div>
                                <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px] md:text-[14px] lg:text-[16px]'>
                                    <div className='w-[97%] mx-auto flex gap-4 items-center'>
                                        <img src={images.ChatWithUs} alt="" />
                                        <p className='text-[16px] opacity-95'>Chat With Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <Outlet />
                }
            </div>
        </>
    )
}

export default Account;