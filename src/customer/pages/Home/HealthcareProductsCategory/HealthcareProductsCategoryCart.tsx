import React, { useEffect } from "react";
import { HomeCategory } from "../../../../types/homeCategoryType";

type Props = {
    item: HomeCategory;
};

const HealthcareProductsCategoryCart: React.FC<Props> = ({ item }) => {
    useEffect(() => {
        console.log("Item image:", item.image);
    }, [item]);

    return (
        <div className="w-48 p-4 bg-white rounded-2xl shadow-md text-center hover:shadow-lg transition-all duration-300">
            <img
                className="h-32 w-32 object-contain mx-auto rounded-md"
                src={item.image}
                alt={item.name}
                onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100?text=No+Image";
                }}
            />
            <h2 className="font-medium text-sm mt-3 text-gray-800">{item.name}</h2>
        </div>
    );
};

export default HealthcareProductsCategoryCart;
