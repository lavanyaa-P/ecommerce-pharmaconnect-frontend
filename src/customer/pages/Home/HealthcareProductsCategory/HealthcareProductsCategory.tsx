import React from "react";
import HealthcareProductsCategoryCart from './HealthcareProductsCategoryCart';

const healthcareCategoryItems = [
    {
        img: "https://uoflhealth.org/wp-content/uploads/2021/11/First-Aid-kit.jpg",
        name: "First Aid Kit",
    },
    {
        img: "https://www.netmeds.com/images/product-v1/600x600/15590/omron_automatic_blood_pressure_monitor_hem_7120_0_2.jpg",
        name: "Blood Pressure Monitor",
    },
    {
        img: "https://www.netmeds.com/images/product-v1/600x600/922357/prozo_plus_fingertip_pulse_oximeter_multicolour_0_2.jpg",
        name: "Pulse Oximeter",
    },
    {
        img: "https://www.netmeds.com/images/product-v1/600x600/978797/carent_digital_thermometer_dmt4335_1s_0_3.jpg",
        name: "Digital Thermometer",
    },
    {
        img: "https://www.netmeds.com/images/product-v1/600x600/957715/status_n95_cup_face_mask_white_pack_of_10_1s_0_0.jpg",
        name: "N95 Face Masks",
    },
    {
        img: "https://www.netmeds.com/images/product-v1/150x150/909825/dettol_instant_hand_sanitizer_original_200_ml_bottle_0_0.jpg",
        name: "Hand Sanitizer",
    },

];

const HealthcareProductsCategory = () => {
    return (
        <div className="flex flex-wrap gap-5 py-5 lg:px-20 border-b">
            {healthcareCategoryItems.map((item, index) => (
                <HealthcareProductsCategoryCart key={index} img={item.img} name={item.name} />
            ))}
        </div>
    );
};

export default HealthcareProductsCategory;
