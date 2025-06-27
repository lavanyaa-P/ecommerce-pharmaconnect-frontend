import React from 'react'
import ShopByCategoryCart from './ShopByCategoryCart'

const ShopByCategory = () =>{
    return (
        <div className='flex flex-wrap justify-between lg:px-10 gap-7'>
            {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item)=><ShopByCategoryCart/>)}
        </div>
    )
}

export default ShopByCategory