import { useSelector } from "react-redux";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import sellerAccountService from "../appwrite/sellerAccountService";

function ProductReviewSection({reviews}){


       const randomIndex = Math.floor(Math.random() * reviews.length);
       const randomReview=reviews[randomIndex];
    //   console.log("This is the random Reviewe: ", randomReview);

    

// Convert to a Date object
const date = new Date(randomReview?.$createdAt);

// Extract the day, month, and year
const day = date.getDate(); // Get the day of the month
const month = date.toLocaleString('en-US', { month: 'short' }); // Get the short month name (e.g., "Dec")
const year = date.getFullYear(); // Get the full year

// Combine into the desired format
const formattedDate = `${day} ${month} ${year}`;


    


    return(

        <>
       <div className="bg-white mt-2 p-4" >
        <p className="self-start text-sm opacity-65 tracking-wide mb-6"  >Rating and Reviews ({reviews.length})</p>

        {reviews.length===0
        ?<p className="self-start text-[12.8px] opacity-65 tracking-wide mx-auto text-center"  >This Product has no reviews.</p>
        :
        <div className="reviewDiv flex  flex-col gap-2">
            <div className="nameRating flex items-center justify-between">
               <div className="flex items-center gap-2">
                   <p className="text-[11px] tracking-wider opacity-70" >{randomReview.name}</p>
                   <p className="text-[10px] tracking-wider opacity-70 " >⊙{formattedDate}</p>
                </div> 

                <Rating name="half-rating-read" className="mb-1" size="small" defaultValue={0} value={parseInt(randomReview.reviewStars)}  precision={0.5} readOnly />
            </div>
            <div className="reviewText">
             <p className="text-[12px]" > {randomReview.reviewText}</p>
            </div>
            <div className="reviewImages flex gap-8" >
                {Array.isArray(randomReview.reviewImages) && randomReview.reviewImages.map((imageID)=>(
                    
                    <img key={imageID} className="w-12 h-12" src={sellerAccountService.getImagePreview(imageID)} alt="" />  
                ))}

            </div>

        </div>


        }
        
        
        </div> 
        
        </>
    )


}
export default ProductReviewSection;