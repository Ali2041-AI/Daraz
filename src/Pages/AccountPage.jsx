import { useNavigate } from 'react-router';
import images from '../assets/Images';
import Images from '../assets/Images'

function Account(){

  const navigate=useNavigate();

   const goBack=()=>{
    navigate('/');
   }

    return(
        <>
        <div className='wrapper w-full font-notoSans min-h-screen bg-[#EFF0F5]'>
            <nav className=" py-3 bg-[#F86306] w-full ">
              <div className='flex items-center gap-4 w-[97%]  mx-auto'>
                <img src={Images.backIcon} alt="" className='w-6' onClick={goBack} />
                <p className='text-black'>My Account</p>
              </div>
             
            </nav>
            <div className='opacity-90 py-2 mb-2 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex justify-between items-center'>
                    <p  >
                    Hello, Welcome to Daraz!
                    </p>
                    <button className='text-white bg-[#F86306]  px-2 py-2 '>LOGIN/SIGNUP</button>
                    </div>
              </div>
              <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.MyOrders} alt="" />
                    <p className='text-[16px] opacity-95'>My Orders</p>
                    </div>
              </div>
              <div className='opacity-90 py-3 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.FollowedStore} alt="" />
                    <p className='text-[16px] opacity-95' >My Wishlist & Followed Stores</p>
                    </div>
              </div>
              <div className='opacity-90  py-2 mb-2 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.sellerIcon} className='w-6' alt="" />
                    <p className='text-[16px] opacity-95 '>Create Seller Account</p>
                    </div>
              </div>
              <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.Policies} alt="" />
                    <p className='text-[16px] opacity-95 '>Policies</p>
                    </div>
              </div>
              <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.Feedback} alt="" />
                    <p className='text-[16px] opacity-95 '>Feedback</p>
                    </div>
              </div>
              <div className='opacity-90 py-2 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.Help} alt="" />
                    <p className='text-[16px] opacity-95 '>Help</p>
                    </div>
              </div>
              <div className='opacity-90  py-2 mb-1 bg-white w-full tracking-wider text-[11px]'>
                <div className='w-[97%] mx-auto flex gap-4 items-center'>
                    <img src={images.ChatWithUs} alt="" />
                    <p className='text-[16px] opacity-95 '>Chat With Us</p>
                    </div>
              </div>



        </div>
        </>
    )






}


export default Account;