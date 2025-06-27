import React from "react";

const DealCart = () => {
    return (
        <div className="w-[300px] cursor-pointer flex-shrink-0">
            <img
                className="w-full h-[180px] object-cover object-top"
                src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1735651089_Mini-banner_web.jpg"
                alt="Deal"
            />
            <div className="border-4 border-black bg-black text-white p-2 text-center">
                <p className="text-lg font-semibold">Skin care</p>
                <p className="text-2xl font-bold">50% OFF</p>
                <p className="text-balance text-lg">Shop now</p>
            </div>
        </div>
    );
};


export default DealCart