import React from "react";
import { HomeCategory } from "../../../../types/homeCategoryType";

const DealCart = ({ item }: { item: HomeCategory }) => {
    return (
        <div className="w-[250px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <img
                className="w-full h-40 object-contain bg-white p-2"
                src={item.image}
                alt={item.name}
                onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                }}
            />
            <div className="bg-black text-white p-4 text-center">
                <p className="text-base font-semibold mb-1">{item.name}</p>
                <p className="text-xl font-bold">{item.discount ?? "20"}% OFF</p>
                <p className="text-sm mt-1">Shop Now</p>
            </div>
        </div>
    );
};

export default DealCart;
