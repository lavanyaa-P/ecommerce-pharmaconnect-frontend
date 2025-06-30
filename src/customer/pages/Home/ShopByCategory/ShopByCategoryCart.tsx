import React from 'react';
import './ShopByCategory.css';

type Props = {
  img: string;
  title: string;
};

const ShopByCategoryCart: React.FC<Props> = ({ img, title }) => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='custom-border h-[150px] w-[150px] lg:w-[200px] lg:h-[200px] bg-white rounded-full overflow-hidden'>
        <img
          className='block group-hover:scale-95 group-hover:brightness-75 transition duration-700 object-cover object-top h-full w-full'
          src={img}
          alt={title}
        />
      </div>
      <h1 className="text-center font-medium">{title}</h1>
    </div>
  );
};

export default ShopByCategoryCart;
