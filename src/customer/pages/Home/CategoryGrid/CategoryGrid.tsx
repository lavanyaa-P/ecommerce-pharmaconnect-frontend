import React from "react";

const CategoryGride = () =>{
    return (
        <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[200px] px-5 lg:px-20">
            <div className="col-span-4 row-span-6 text-white ">
                <img className='rounded-md'
                src="https://mercury.akamaized.net/i/fa9cb3db2391fa5e0cc072781f1a58e1_91345_0.jpg"/>
            </div>

            <div className="col-span-4 row-span-6 text-white ">
                <img className='rounded-md' src="https://images.apollo247.in/os/prod-media/creative-1748701136784-824_x_412.jpg?tr=q-80,f-webp,w-250,dpr-2,c-at_max"/>
            </div>

            <div className="col-span-4 row-span-6 text-white ">
                <img className='rounded-md' src="https://images.apollo247.in/os/prod-media/creative-1748697198502-Page_Banner_Width_824px_X_Height_412px.jpg?tr=q-80,f-webp,w-250,dpr-2,c-at_max"/>
            </div>

            
        </div>
    )
}

export default CategoryGride