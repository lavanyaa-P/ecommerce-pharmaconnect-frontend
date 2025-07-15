import React from "react";
import DealCart from "./DealCart";
import { useAppSelector } from "../../../../State/Store";

const Deal = () => {
    const { customer } = useAppSelector((store) => store);

    return (
        <div className="py-5 px-5 lg:px-[55px]">
            <div className="flex flex-wrap justify-center gap-8">
                {customer.homeData?.dealCategories.map((item) => (
                    <DealCart key={item.categoryId} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Deal;
