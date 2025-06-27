import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const steps = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
    { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED" },
    { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
    { name: "Arriving", description: "by 16 Jul - 18 Jul", value: "ARRIVING" },
    { name: "Arrived", description: "by 16 Jul - 18 Jul", value: "DELIVERED" }
];

const canceledStep = [
    { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
    { name: "Order Canceled", description: "on Thu, 11 Jul", value: "CANCELLED" }
];

const OrderStepper = ({ orderStatus }: { orderStatus: string }) => {
    const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
        if (orderStatus === "CANCELLED") {
            setStatusStep(canceledStep);
        } else {
            setStatusStep(steps);
        }
    }, [orderStatus]);

    const currentStep = statusStep.findIndex(step => step.value === orderStatus);

    
    return (
        <Box className="mx-auto my-10">
            {statusStep.map((step, index) => (
                <div key={index} className="flex px-4">
                    <div className="flex flex-col items-center">
                        <Box
                            className="w-8 h-8 rounded-full flex items-center justify-center z-10"
                            sx={{
                                backgroundColor: index <= currentStep ? '#003399' : '#D1D5DB', // gray-300
                                color: '#fff' // text inside circle stays white on blue, else default
                            }}
                        >
                            {step.value === orderStatus ? (
                                <CheckCircleIcon sx={{ fontSize: 16 }} />
                            ) : (
                                <FiberManualRecordIcon sx={{ fontSize: 12 }} />
                            )}
                        </Box>

                        {index < statusStep.length - 1 && (
                            <div
                                className="h-20 w-[2px]"
                                style={{
                                    backgroundColor: index < currentStep ? '#003399' : '#D1D5DB'
                                }}
                            ></div>
                        )}
                    </div>
                    <div className="pl-2 w-full">
                        <div
                            className={`w-full ${step.value === orderStatus
                                    ? "p-2 text-white font-medium rounded-md -translate-y-3"
                                    : ""
                                } ${orderStatus === "CANCELLED" && step.value === orderStatus
                                    ? "bg-red-500 text-white"
                                    : ""
                                }`}
                            style={{
                                backgroundColor:
                                    step.value === orderStatus
                                        ? '#003399'
                                        : undefined
                            }}
                        >
                            <p>{step.name}</p>
                            <p className={`text-xs ${step.value === orderStatus ? 'text-gray-200' : 'text-gray-500'}`}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default OrderStepper;
