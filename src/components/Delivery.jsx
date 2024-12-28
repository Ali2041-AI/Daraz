import { ClassNames } from "@emotion/react";
import { useSelector } from "react-redux";
import images from "../assets/Images";
import { useNavigate } from "react-router";

function Delivery({productID}){



    const userAddresses = useSelector(state => state.userData?.userAddresses?.address);
    console.log(userAddresses);
    const parsedAddresses = userAddresses?.map((address) => {
        try {
            return JSON.parse(address);
        } catch (error) {
            console.error("Failed to parse address:", address, error);
            return null;
        }
    }).filter(address => address !== null);
    const defaultAddress = Array.isArray(parsedAddresses) ? parsedAddresses.filter((address) => address.default) : [];






    const currentDate = new Date();
    const date = currentDate.getDate(); 
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const deliveryDate1 = addDays(currentDate, 4);
    const deliveryDate2 = addDays(currentDate, 5);

    const expectedDeliveryDate = `${deliveryDate1.getDate()}-${deliveryDate2.getDate()} ${months[deliveryDate1.getMonth()]}`;


    const navigate=useNavigate();


    return(
        <>

       <div className="bg-white md:hidden cursor-pointer mt-2 p-4"  onClick={()=>navigate(`/addressPage?productID=${productID}`)} >

        <div className="flex gap-8 items-center" >
            <span className="self-start text-sm opacity-65 tracking-wide" >Delivery</span>


       {userAddresses
       ?
       <div className="flex  gap-2" >

       <div className="text-[14px] flex  gap-1 flex-col" >
        <span className="text-[#F85606] text-[13px]" >{defaultAddress[0].province}, {defaultAddress[0].city} - {defaultAddress[0].completeAddress}   </span>
        <span className="text-[13px]" >Standard Delivery,Guaranted by {expectedDeliveryDate}</span>
       </div>
       <span className="self-center  mt-6 text-sm font-bold text-[13px]" >Rs.145</span>
       <img className="w-4 h-4 cursor-pointer mr-4  text-[13px]" src={images.iconLeft} alt="" />
       </div>
 
       

       :
       <div className="flex  gap-2" >

       <div className="text-[14px] flex  gap-1 flex-col" >
        <span className="text-[#F85606] text-[13px]" >Sindh, Karachi - Gulshan-e-Iqbal, Block 15   </span>
        <span className="text-[13px]">Standard Delivery,Guaranted by {expectedDeliveryDate}</span>
       </div>
       <span className="self-center  mt-6 text-[13px] font-bold" >Rs.145</span>
       <img className="w-4 h-4 cursor-pointer mr-4 text-[13px]" src={images.iconLeft} alt="" />
       </div>
 
       
    }
        </div>
    </div>
    <div className="hidden md:block">
        <div className="bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm opacity-65 tracking-wide">Delivery Options</span>
                <button 
                    className="text-blue-500 text-sm" 
                    onClick={() => navigate(`/addressPage?productID=${productID}`)}
                >
                    Change
                </button>
            </div>
            {userAddresses ? (
                <div className="flex flex-col gap-2">
                    <div className="text-[14px]">
                        <span className="text-[#F85606] text-[13px]">
                            {defaultAddress[0].province}, {defaultAddress[0].city} - {defaultAddress[0].completeAddress}
                        </span>
                    </div>
                    <div className="text-[13px]">
                        <span>Standard Delivery, Guaranteed by {expectedDeliveryDate}</span>
                        <span className="block font-bold">Rs.145</span>
                    </div>
                    <div className="text-[13px]">
                        <span>Cash on Delivery</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="text-[14px]">
                        <span className="text-[#F85606] text-[13px]">
                            Sindh, Karachi - Gulshan-e-Iqbal, Block 15
                        </span>
                    </div>
                    <div className="text-[13px]">
                        <span>Standard Delivery, Guaranteed by {expectedDeliveryDate}</span>
                        <span className="block font-bold">Rs.145</span>
                    </div>
                    <div className="text-[13px]">
                        <span>Cash on Delivery</span>
                    </div>
                </div>
            )}
        </div>
        
    </div>
     

        
        </>
    )




}

export default Delivery;