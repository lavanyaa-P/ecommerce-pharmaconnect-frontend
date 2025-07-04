import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string | number;
  title: string;
  categoryId: string | number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount?: string;
  images: string[];
};

const ProductCart: React.FC<Props> = ({
  id,
  title,
  categoryId,
  name,
  description,
  price,
  originalPrice,
  discount,
  images,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Image switching logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const computedDiscount = discount
    ? discount
    : `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;

  return (
    <div
      onClick={() =>
        navigate(`/product-details/${categoryId}/${title}/${id}`)
      }
      className="group p-4 border rounded shadow hover:scale-[1.02] transition-transform cursor-pointer"
    >
      {/* ⭐ Just One Image That Changes */}
      <div
        className="relative w-full h-60 overflow-hidden rounded"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={images[currentImage]}
          alt="product"
          className="w-full h-full object-cover"
        />

        {isHovered && (
          <div className="absolute bottom-2 left-2 flex gap-2 bg-white bg-opacity-80 p-1 rounded">
            <Button variant="contained" color="secondary">
              <Favorite sx={{ color: "#003399" }} />
            </Button>
            <Button variant="contained" color="secondary">
              <ModeComment sx={{ color: "#003399" }} />
            </Button>
          </div>
        )}
      </div>

      {/* ⭐ Details */}
      <div className="pt-3 space-y-1">
        <h1 className="font-semibold text-gray-800">{name}</h1>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      {/* ⭐ Price */}
      <div className="flex items-center gap-3 mt-1">
        <span className="text-lg font-semibold text-gray-800">₹{price}</span>
        <span className="line-through text-gray-500">₹{originalPrice}</span>
        <span className="text-green-600 font-bold">{computedDiscount}</span>
      </div>
    </div>
  );
};

export default ProductCart;
