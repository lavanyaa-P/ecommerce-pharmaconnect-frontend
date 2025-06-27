import React from "react";

const SimilarProductCart = () =>{
    return (
        <div>

            <div className="group px-4 relative transition-transform duration-300 hover:scale-[1.02] origin-center">
                        <div
                            className="card relative"
                            
                        >
                            <div
                                className="carousel-inner flex transition-transform duration-500 ease-in-out"
                                
                            >
                                    <img className="card-media w-full object-cover" src="https://www.netmeds.com/images/product-v1/600x600/902221/sahyog_wellness_multi_function_non_contact_body_object_infrared_thermometer_0_1.jpg" alt="product" />
                            </div>

                        </div>
            
                        <div className="details pt-3 space-y-1 rounded-md">
                            <div className="name">
                                <h1 className="font-semibold text-gray-800">Sahyog</h1>
                                <p className="text-gray-500">Digital Thermometer</p>
                            </div>
                        </div>
            
                        <div className="price flex items-center gap-3">
                            <span className="font-sans text-gray-800">₹ 1764</span>
                            <span className="line-through text-gray-400">₹ 2595</span>
                            <span className="text-primary-color font-semibold">32%</span>
                        </div>
                    </div>

        </div>
    )
}

export default SimilarProductCart