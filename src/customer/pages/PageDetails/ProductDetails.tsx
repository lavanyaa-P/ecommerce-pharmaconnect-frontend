import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Divider
} from '@mui/material';
import {
    AddShoppingCart,
    FavoriteBorder,
    LocalShipping,
    Remove,
    Wallet,
    WorkspacePremium
} from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';
import ReviewCart from '../Review/ReviewCart';

const ProductDetails = () => {
    const [quantity, setQuantity] = React.useState(1);

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                {/* 🖼️ LEFT SIDE: Image Gallery */}
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[20%] flex flex-wrap lg:flex-col gap-2'>
                        {[1, 1, 1, 1].map((item, index) => (
                            <img
                                key={index}
                                className='lg:w-full w-[125px] h-[125px] object-cover cursor-pointer rounded-md'
                                src='https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_2_0.jpg'
                                alt={`Thumbnail ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className='w-full lg:w-[80%]'>
                        <img
                            className='w-full max-h-[500px] object-contain rounded-md'
                            src='https://www.netmeds.com/images/product-v1/600x600/902225/sahyog_wellness_digital_thermometer_0_0.jpg'
                            alt='Main Product'
                        />
                    </div>
                </section>

                {/* 📝 RIGHT SIDE: Product Details */}
                <section className='space-y-5'>
                    <h1 className='font-bold text-lg text-primary-color'>Omron</h1>
                    <p className='text-gray-500 font-semibold'>Health Monitors</p>

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
                            <span className="font-sans text-gray-800">₹ 273</span>
                            <span className="line-through text-gray-400">₹ 390</span>
                            <span className="text-primary-color font-semibold">30%</span>
                        </div>
                        <p className='text-sm'>Inclusive of all taxes. Free Shipping above ₹273.</p>
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
                        >
                            Add To Bag
                        </Button>

                        <Button
                            fullWidth
                            variant='outlined'
                            startIcon={<FavoriteBorder />}
                            sx={{ py: '1rem' }}
                        >
                            Wishlist
                        </Button>
                    </div>

                    <div className='mt-12 space-y-5'>
                        <ReviewCart/>
                        <Divider/>
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
