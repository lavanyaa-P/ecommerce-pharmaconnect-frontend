import React from "react";

type Props = {
    img: string;
    name: string;
};

const HealthcareProductsCategoryCart: React.FC<Props> = ({ img, name }) => {
    return (
        <div className="w-[200px] text-center mb-4">
            <img className="object-contain h-16 w-full rounded" src={img} alt={name} />
            <h2 className="font-semibold text-sm mt-2">{name}</h2>
        </div>
    );
};

export default HealthcareProductsCategoryCart;