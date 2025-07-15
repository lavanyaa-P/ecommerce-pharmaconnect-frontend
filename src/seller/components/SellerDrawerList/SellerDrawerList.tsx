import React from 'react';
import {
    Dashboard,
    ShoppingBag,
    Inventory,
    Add,
    Logout,
} from "@mui/icons-material";
import DrawerList from '../../../component/DrawerList';

const menu = [
    {
        name: "Dashboard",
        path: "/seller",
        icon: <Dashboard className="text-primary-color" />,
        activeIcon: <Dashboard className="text-white" />,
    },
    {
        name: "Orders",
        path: "/seller/orders",
        icon: <ShoppingBag className="text-primary-color" />,
        activeIcon: <ShoppingBag className="text-white" />,
    },
    {
        name: "Products",
        path: "/seller/products",
        icon: <Inventory className="text-primary-color" />,
        activeIcon: <Inventory className="text-white" />,
    },
    {
        name: "Add Product",
        path: "/seller/add-product",
        icon: <Add className="text-primary-color" />,
        activeIcon: <Add className="text-white" />,
    },
];

const menu2 = [
    {
        name: "Logout",
        path: "/",
        icon: <Logout className="text-primary-color" />,
        activeIcon: <Logout className="text-white" />,
    },
];

const SellerDrawerList = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
    return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;