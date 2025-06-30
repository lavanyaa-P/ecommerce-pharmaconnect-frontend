import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";

type Props = {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount?: string;
  images: string[];
};

const ProductCart: React.FC<Props> = ({
  name,
  description,
  price,
  originalPrice,
  discount,
  images
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const computedDiscount = discount
    ? discount
    : `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;

  return (
    <div className="group px-4 relative transition-transform duration-300 hover:scale-[1.02] origin-center">
      <div
        className="card relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="carousel-inner flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              className="card-media w-full object-cover"
              src={img}
              alt="product"
            />
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
          <h1 className="font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      <div className="price flex items-center gap-3">
        <span className="font-sans text-gray-800">₹ {price}</span>
        <span className="line-through text-gray-400">₹ {originalPrice}</span>
        <span className="text-primary-color font-semibold">{computedDiscount}</span>
      </div>
    </div>
  );
};

export default ProductCart;
