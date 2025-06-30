import React from 'react';
import ShopByCategoryCart from './ShopByCategoryCart';

const categoryItems = [
    {
        title: 'Cold & Flu',
        img: 'https://www.netmeds.com/images/category/prod/thumb/cold_and_fever.png',
    },
    {
        title: 'Women Care',
        img: 'https://www.netmeds.com/images/category/prod/thumb/womens_care.png',
    },

    {
        title: 'Ayurvedic',
        img: 'https://www.netmeds.com/images/category/prod/thumb/ayurvedic.png',
    },

    {
        title: 'Bone and joint pain',
        img: 'https://www.netmeds.com/images/category/v1/765/thumb/bone_and_joint_pain_1.png',
    },
    {
        title: 'Homeopathy',
        img: 'https://www.netmeds.com/images/category/v1/491/thumb/homeopathy_1.png'
    }, {
        title: "vitamins and supplements",
        img: "https://www.netmeds.com/images/category/v1/3222/thumb/vitamins_and_supplements_4.png"
    }

];

const ShopByCategory = () => {
    return (
        <div className='flex flex-wrap justify-between lg:px-10 gap-7'>
            {categoryItems.map((item, index) => (
                <ShopByCategoryCart key={index} img={item.img} title={item.title} />
            ))}
        </div>
    );
};

export default ShopByCategory;
