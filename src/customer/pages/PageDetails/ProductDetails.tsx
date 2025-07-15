import {
    AddShoppingCart,
    FavoriteBorder,
    LocalShipping,
    Remove,
    Wallet,
    WorkspacePremium
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import {
    Button,
    Divider
} from '@mui/material';
import React from 'react';

import ReviewCart from '../Review/ReviewCart';
import ReviewForm from '../Review/ReviewForm';
import SimilarProduct from './SimilarProduct';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../../State/customer/cartSlice';
import { fetchProductById } from '../../../State/customer/ProductSlice';
import { fetchProductReviews } from '../../../State/customer/reviewSlice';
import { addProductToWishlist } from '../../../State/customer/wishlistSlice';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
 // ✅ Added this

const ProductDetails = () => {
    const [quantity, setQuantity] = React.useState(1);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { productId } = useParams();
    const jwt = localStorage.getItem("jwt");

    const { reviews, loading: reviewLoading } = useAppSelector(state => state.review);
    const { product, loading: productLoading } = useAppSelector(state => state.product); // ✅ Redux product

    // ✅ Fetch product and reviews
    React.useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(Number(productId)));
            dispatch(fetchProductReviews(Number(productId)));
        }
    }, [dispatch, productId]);

    // ✅ Set default image
    React.useEffect(() => {
        if (product && product.images?.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const handleAddToBag = () => {
        if (!jwt || !product?.id) {
            toast.error("Please login to add items to cart");
            return;
        }

        dispatch(
            addItemToCart({
                jwt,
                request: {
                    productId: product.id,
                    size: "default",
                    quantity: quantity,
                },
            })
        )
            .unwrap()
            .then(() => toast.success("Item added to cart"))
            .catch((err) => toast.error(err));
    };

    const handleAddToWishlist = () => {
        if (!jwt || !product?.id) {
            toast.error("Please login to add to wishlist");
            return;
        }

        dispatch(addProductToWishlist({ productId: product.id }))
            .unwrap()
            .then(() => toast.success("Added to wishlist"))
            .catch((err) => toast.error(err));
    };

    if (productLoading) {
        return <div className="text-center text-gray-600 py-10">Loading product...</div>;
    }

    if (!product) {
        return <div className="text-center text-red-500 py-10">Product not found</div>;
    }

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* LEFT SIDE: Image Gallery */}
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[20%] flex flex-wrap lg:flex-col gap-2'>
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                className={`lg:w-full w-[125px] h-[125px] object-cover cursor-pointer rounded-md border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                    <div className='w-full lg:w-[80%]'>
                        <img
                            className='w-full max-h-[500px] object-contain rounded-md'
                            src={selectedImage ?? product.images[0]}
                            alt='Main Product'
                        />
                    </div>
                </section>

                {/* RIGHT SIDE: Product Details */}
                <section className='space-y-5'>
                    <h1 className='font-bold text-lg text-primary-color'>
                        {product.title ?? product.title}
                    </h1>
                    <p className='text-gray-500 font-semibold'>{product.description}</p>

                    <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
                        <div className='flex gap-1 items-center'>
                            <span>4.5</span>
                            <StarIcon sx={{ color: "#003399", fontSize: '17px' }} />
                        </div>
                        <Divider orientation='vertical' flexItem />
                        <span>234 Ratings</span>
                    </div>

                    <div>
                        <div className="price flex items-center gap-3 mt-5 text-2xl">
                            <span className="font-sans text-gray-800">₹ {product.sellingPrice}</span>
<span className="line-through text-gray-400">₹ {product.mrpPrice}</span>
<span className="text-primary-color font-semibold">
  {product.discountPercent}% OFF
</span>

                        </div>
                        <p className='text-sm'>Inclusive of all taxes. Free Shipping below ₹{product.sellingPrice}.</p>
                    </div>

                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <WorkspacePremium sx={{ color: '#003399' }} />
                            <p>100% money back guarantee</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <LocalShipping sx={{ color: '#003399' }} />
                            <p>Free Shipping & Returns</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Wallet sx={{ color: '#003399' }} />
                            <p>Pay on delivery might be available</p>
                        </div>
                    </div>

                    <div className='mt-7 space-y-2'>
                        <h1>QUANTITY</h1>
                        <div className='flex items-center gap-2 w-[140px] justify-between'>
                            <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                                <Remove />
                            </Button>
                            <span>{quantity}</span>
                            <Button onClick={() => setQuantity(quantity + 1)}>
                                <AddIcon />
                            </Button>
                        </div>
                    </div>

                    <div className='mt-12 flex items-center gap-5'>
                        <Button
                            fullWidth
                            variant='contained'
                            startIcon={<AddShoppingCart />}
                            sx={{ py: '1rem' }}
                            onClick={handleAddToBag}
                        >
                            Add To Bag
                        </Button>

                        <Button
                            fullWidth
                            variant='outlined'
                            startIcon={<FavoriteBorder />}
                            sx={{ py: '1rem' }}
                            onClick={handleAddToWishlist}
                        >
                            Wishlist
                        </Button>
                    </div>

                    {/* ✅ DYNAMIC REVIEWS SECTION */}
                    <div className='mt-12 space-y-5'>
                        <h2 className='text-lg font-semibold'>Customer Reviews</h2>

                        {/* ✅ Add Review Form */}
                        <ReviewForm
                            productId={Number(productId)}
                            onReviewSubmitted={() => dispatch(fetchProductReviews(Number(productId)))}
                        />

                        {reviewLoading && <p>Loading reviews...</p>}
                        {!reviewLoading && reviews.length === 0 && <p>No reviews found.</p>}
                        {!reviewLoading &&
                            reviews.map((review) => (
                                <div key={review.id}>
                                    <ReviewCart review={review} />
                                    <Divider sx={{ my: 2 }} />
                                </div>
                            ))}
                    </div>
                </section>
            </div>

            <div className='mt-20'>
                <h1 className='text-2xl font-bold '>Similar Product</h1>
                <div className='pt-5'>
                    <SimilarProduct />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
