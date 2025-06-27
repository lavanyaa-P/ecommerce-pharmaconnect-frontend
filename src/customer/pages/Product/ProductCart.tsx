import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";

const images = [
    "https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_0_0.jpg",
    "https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_2_0.jpg"
];

const ProductCart = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="group px-4 relative transition-transform duration-300 hover:scale-[1.02] origin-center">
            <div
                className="card relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="carousel-inner flex transition-transform duration-500 ease-in-out"
                    style= {{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                    {images.map((item, index) => (
                        <img key={index} className="card-media w-full object-cover" src={item} alt="product" />
                    ))}
                </div>

                {isHovered && (
                    <div className="absolute bottom-4 left-4 flex gap-2 bg-white bg-opacity-75 p-2 rounded shadow">
                        <Button variant="contained" color="secondary">
                            <Favorite sx={{ color: "#003399" }} />
                        </Button>
                        <Button variant="contained" color="secondary">
                            <ModeComment sx={{ color: "#003399" }} />
                        </Button>
                    </div>
                )}
            </div>

            <div className="details pt-3 space-y-1 rounded-md">
                <div className="name">
                    <h1 className="font-semibold text-gray-800">Sahyog</h1>
                    <p className="text-gray-500">Digital Thermometer</p>
                </div>
            </div>

            <div className="price flex items-center gap-3">
                <span className="font-sans text-gray-800">₹ 273</span>
                <span className="line-through text-gray-400">₹ 390</span>
                <span className="text-primary-color font-semibold">30%</span>
            </div>
        </div>
    );
};

export default ProductCart;
