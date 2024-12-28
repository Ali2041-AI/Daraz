import React from 'react';
import images from '../assets/Images';
import { useNavigate } from 'react-router';

const FooterNavigationSeller = ({productData}) => {

    const navigate=useNavigate();
    return (
        <footer>
            <nav>
            <div className="w-full fixed z-50 bottom-0 bg-white shadow-lg py-3">
                        <div className="w-[90%] mx-auto max-w-[600px] flex justify-between items-center text-gray-600">
                            <FooterIcon src={images.sellerProducts} label="Products" onClick={()=>navigate('/account/storeDashboard')} />
                            <FooterIcon
                                src={images.revenue}
                                label="Revenue"
                                onClick={() => navigate('/account/storeDashboard/revenue', { state: { productData } })}
                            />
                            <FooterIcon
                                src={images.orders}
                                label="Orders"
                                onClick={() => navigate('/account/storeDashboard/orders', { state: { productData } })}
                            />
                             <FooterIcon
                                src={images.SellerQNA}
                                label="Queries"
                                onClick={() => navigate('/account/storeDashboard/customerQueries', { state: { productData } })}
                            />
                            <FooterIcon src={images.settings} label="Settings" onClick={() => navigate('/account')} />
                        </div>



                        
            </div>
                        
            </nav>
        </footer>
    );
};
function FooterIcon({ src, label, onClick }) {
    return (
        <div onClick={onClick} className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition-colors">
            <img src={src} className="w-5 md:w-6 mb-1" alt={label} />
            <p className="text-xs md:text-sm">{label}</p>
        </div>
    );
}

export default FooterNavigationSeller;