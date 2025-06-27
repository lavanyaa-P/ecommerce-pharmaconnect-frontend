import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

const OrderItem = () => {
    return(
        <div className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
            <div className="flex items-center gap-5">
                <div>
                    <Avatar sizes='small' sx={{ bgcolor:"#003399" }}>
                        <ElectricBolt/>
                    </Avatar>
                </div>
                <div>
                    <h1 className="font-bold text-primary-color">PENDING</h1>
                    <p>Arriving by Mon, 15 Jul</p>
                </div>
            </div>

            <div className="p-5 bg-teal-50 flex gap-3">
                <div>
                    <img className="w-[70px]"
                    src='https://www.netmeds.com/images/product-v1/600x600/929475/cetaphil_sun_spf_50_uvb_uva_very_high_protection_light_gel_50ml_149854_0_5.jpg'/>
                </div>
                <div className="w-full space-y-2">
                    <h1 className='font-semibold'>Virani pharma</h1>
                    <p>CETAPHIL Sun SPF 50 UVB/UVA Very High Protection Light Gel is dermatologically tested and recommended by skincare professionals for daily sun protection.</p>
                    <p><strong>FREE</strong></p>
                </div>
            </div>
        </div>
    )
}

export default OrderItem