import React from 'react';
import './ShopByCategory.css';

const ShopByCategoryCart: React.FC = () => {
  return (
        <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custom-border h-[150px] w-[150px] lg:w-[200px] lg:h-[200px] bg-white rounded-full overflow-hidden'>
            <img
              className='block group-hover:scale-95 group-hover:brightness-75 transition duration-700 object-cover object-top h-full w-full'
              src='https://www.netmeds.com/images/product-v1/150x150/1073931/dr_romas_homeo_flu_kit_515891_0_0.jpg'
              alt='Cold and Flu'
            />
        </div>
        <h1>Cold and Flu</h1>
    </div>
  );
};

export default ShopByCategoryCart;
