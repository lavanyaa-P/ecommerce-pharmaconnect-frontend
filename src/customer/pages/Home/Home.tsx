import React from 'react';
import HealthcareProductsCategory from './HealthcareProductsCategory/HealthcareProductsCategory';
import CategoryGride from './CategoryGrid/CategoryGrid';
import Deal from './Deal/Deal';
import { Button } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ShopByCategory from './ShopByCategory/ShopByCategory';



const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='space-y-5 lg:space-y-10 relative'>
            <HealthcareProductsCategory />
            <CategoryGride />

            <div className='pt-20'>
                <h1
                    className='text-lg lg:text-4xl font-bold pb-5 lg:pb-10 text-center'
                    style={{ color: '#003399' }}
                >
                    Today's Deal
                </h1>
                <Deal />
            </div>

            <div className='py-20'>
                <h1
                    className='text-lg lg:text-4xl font-bold pb-5 lg:pb-10 text-center'
                    style={{ color: '#003399' }}
                >
                    Shop by Category
                </h1>
                <ShopByCategory />
            </div>

            <section className='relative lg:px-20 h-[200px] lg:h-[450px] bg-white'>
                <img
                    className='w-full h-full object-contain'
                    src='https://www.scnsoft.com/ecommerce/sell-medical-supply/cover-pic-sell-medical-supply-new-01.svg'
                    alt='Sell Medical Supplies'
                />

                <div className='absolute top-[60%] left-2 lg:left-[12rem] transform -translate-y-1/2 font-semibold text-lg lg:text-3xl space-y-2 text-black'>
                    <p>Sell your product with</p>
                    <p className='font-bold' style={{ color: '#003399' }}>PharmaConnect</p>
                    <div className='pt-6 flex justify-center'>
                    <Button
  onClick={() => navigate("/become-seller")}
                            startIcon={<Storefront />}
                            variant='contained'
                            size='large'
                        >
                            Become Seller
                        </Button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
