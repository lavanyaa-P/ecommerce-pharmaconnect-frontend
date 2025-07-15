import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/wishlistSlice";

export type Props = {
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

export const ProductCart: React.FC<Props> = ({
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
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleWishlist = (e: any) => {
    e.stopPropagation();
    if (id) {
      dispatch(addProductToWishlist({ productId: Number(id) }));
    }
  };

  const handleSubmitReview = async (e: any) => {
    e.stopPropagation();
    try {
      console.log("Submitted Review:", reviewText);
      setShowReviewModal(false);
      setReviewText("");
    } catch (err) {
      console.error("Review failed", err);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          const slug = title.toLowerCase().replace(/ /g, "-");
          navigate(`/product-details/${categoryId}/${slug}/${id}`);
        }}
        className="group p-4 border rounded shadow hover:scale-[1.02] transition-transform cursor-pointer"
      >
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
              <Button onClick={(e) => handleWishlist(e)} variant="contained" color="secondary">
                <Favorite sx={{ color: "#003399" }} />
              </Button>
              <Button onClick={(e) => { e.stopPropagation(); setShowReviewModal(true); }} variant="contained" color="secondary">
                <ModeComment sx={{ color: "#003399" }} />
              </Button>
            </div>
          )}
        </div>

        <div className="pt-3 space-y-1">
          <h1 className="font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-lg font-semibold text-gray-800">₹{price}</span>
          <span className="line-through text-gray-500">₹{originalPrice}</span>
          <span className="text-green-600 font-bold">{computedDiscount}</span>
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-[#003399]">Write a Review</h2>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <Button variant="contained" color="primary" onClick={handleSubmitReview}>
                Submit
              </Button>
              <Button onClick={() => setShowReviewModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCart;
export {};
