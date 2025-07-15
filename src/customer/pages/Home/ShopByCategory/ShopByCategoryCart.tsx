import React from 'react';
import './ShopByCategory.css';
import { HomeCategory } from '../../../../types/homeCategoryType';
import { Link } from 'react-router-dom';

const ShopByCategoryCart = ({ item }: { item: HomeCategory }) => {
  if (!item.name) return null;

  const formattedCategory = item.name?.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and') || '';


  return (
    <Link to={`/products/${formattedCategory}`}>
      <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custom-border h-[150px] w-[150px] lg:w-[200px] lg:h-[200px] bg-white rounded-full overflow-hidden'>
          <img
            className='block group-hover:scale-95 group-hover:brightness-75 transition duration-700 object-cover object-top h-full w-full'
            src={item.image}
            alt={item.name}
          />
        </div>
        <h1 className="text-center font-medium">{item.name}</h1>
      </div>
    </Link>
  );
};

export default ShopByCategoryCart;
