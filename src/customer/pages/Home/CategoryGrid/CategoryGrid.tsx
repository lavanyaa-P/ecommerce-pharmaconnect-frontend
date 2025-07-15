import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryGride = () => {
    const navigate = useNavigate();

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 px-5 lg:px-20 py-6">
            {/* Image 1 - Shampoo */}
            <div
                className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-md bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate("/products/shampoo")}
            >
                <img
                    className="w-full h-full object-contain"
                    src="https://mercury.akamaized.net/i/fa9cb3db2391fa5e0cc072781f1a58e1_91345_0.jpg"
                    alt="Shampoo"
                />
            </div>

            {/* Image 2 - Pre Workout */}
            <div
                className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-md bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate("/products/pre_workout")}
            >
                <img
                    className="w-full h-full object-contain"
                    src="https://images.apollo247.in/os/prod-media/creative-1748701136784-824_x_412.jpg?tr=q-80,f-webp,w-250,dpr-2,c-at_max"
                    alt="Pre Workout"
                />
            </div>

            {/* Image 3 - Baby Soap & Shampoo */}
            <div
                className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-md bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate("/products/baby_soap_shampoo")}
            >
                <img
                    className="w-full h-full object-contain"
                    src="https://images.apollo247.in/os/prod-media/creative-1748697198502-Page_Banner_Width_824px_X_Height_412px.jpg?tr=q-80,f-webp,w-250,dpr-2,c-at_max"
                    alt="Baby Soap & Shampoo"
                />
            </div>
        </div>
    );
};

export default CategoryGride;
