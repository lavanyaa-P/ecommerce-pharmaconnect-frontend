import React, { useState } from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { Button } from '@mui/material'
import DealTable from './DealTable'
import DealCategoryTable from './DealCategoryTable'
import CreateDealForm from './CreateDealForm'

const tabs = [
    "Deals",
    "Category",
    "Create Deal"
]

const Deal = () => {
    const [activeTab, setActiveDeal] = useState("Deals")
    return (
        <div>
            <div className='flex gap-4'>
                {tabs.map((item) =>
                    <Button
                        onClick={() => setActiveDeal(item)}
                        variant={activeTab == item ? "contained" : "outlined"}
                        key={item}
                    >
                        {item}
                    </Button>
                )}
            </div>

            <div className='mt-5'>
                {activeTab == "Deals" ? (
                    <DealTable />
                ) : activeTab == "Category" ? (
                    <DealCategoryTable />
                ) : (
                    <div className='mt-5 flex justify-center items-center h-[70vh] w-full'>
                        <div className='w-full max-w-md'>
                            <CreateDealForm />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Deal
