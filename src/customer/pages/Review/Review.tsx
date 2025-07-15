import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import ReviewCart from "./ReviewCart";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchProductReviews } from "../../../State/customer/reviewSlice";
import { useParams } from "react-router-dom";

const Review = () => {
    const { productId } = useParams();
    const dispatch = useAppDispatch();
    const { reviews } = useAppSelector((state) => state.review);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductReviews(Number(productId)));
        }
    }, [productId]);

    return (
        <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
            <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
                <img src="https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_0_0.jpg" />
                <div>
                    <p className="font-bold text-xl">Omron</p>
                    <p className="text-lg text-gray-600">Health Monitors</p>
                    <div className="price flex items-center gap-3 mt-5 text-2xl">
                        <span className="font-sans text-gray-800">₹ 273</span>
                        <span className="line-through text-gray-400">₹ 390</span>
                        <span className="text-primary-color font-semibold">30%</span>
                    </div>
                </div>
            </section>

            <section className="space-y-5 w-full lg:w-[70%]">
                {reviews.map((review) => (
                    <div key={review.id} className="space-y-3">
                        <ReviewCart review={review} />
                        <Divider />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Review;
