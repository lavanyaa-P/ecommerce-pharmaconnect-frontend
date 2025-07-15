import React from 'react';
import HomeCategoryTable from './HomeCategoryTable';
import { useAppSelector } from '../../../State/Store';

const ShopByCategoryTable = () => {
    const { customer } = useAppSelector((store) => store);

    return (
        <div>
            {customer.homeData?.medicineCategories ? (
                <HomeCategoryTable data={customer.homeData.medicineCategories} />
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
};

export default ShopByCategoryTable;