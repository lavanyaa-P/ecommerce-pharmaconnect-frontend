import React from "react";
import HealthcareProductsCategoryCart from './HealthcareProductsCategoryCart';
import { useAppSelector } from "../../../../State/Store";

const HealthcareProductsCategory = () => {
    const { customer } = useAppSelector((store) => store);
    const { homeData, loading, error } = customer;

    return (
        <div className="flex flex-wrap justify-center gap-10 py-5 lg:px-25 border-b">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {homeData && homeData.healthcareCategories && homeData.healthcareCategories.length > 0 ? (
                homeData.healthcareCategories.map((item) => (
                    <HealthcareProductsCategoryCart key={item.categoryId} item={item} />
                ))
            ) : (
                !loading && <p>No healthcare categories found</p>
            )}
        </div>
    );
};

export default HealthcareProductsCategory;
