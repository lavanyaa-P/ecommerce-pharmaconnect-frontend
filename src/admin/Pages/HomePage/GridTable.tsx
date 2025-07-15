import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const GridTable = () =>{
    const { customer } = useAppSelector((store) => store);
    return(
        <div>
            <HomeCategoryTable data={customer.homeData?.essentialsCategories ?? []}/>
        </div>
    )
}

export default GridTable