import React from "react";
import SimilarProductCart from "./SimilarProductCart";

const similarProduct = () =>{
    return (
        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1 justify-between garp-4 gap-y-8'>

            {[1,1,1,1,1,1,1].map((item)=><SimilarProductCart/>)}

        </div>
    )
}

export default similarProduct;