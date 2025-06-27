import React from "react";
import DealCart from "./DealCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    return (
        <div className="py-5 lg:px-[55px]">
            <div className="flex gap-4 px-5 lg:px-[25px]">

                {[1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                    <DealCart key={i} />
                ))}
            </div>
        </div>
    )
}

export default Deal