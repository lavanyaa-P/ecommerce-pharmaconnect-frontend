import {
    Avatar,
    Box,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
    AddShoppingCart,
    FavoriteBorder,
    Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const navigate = useNavigate();

    const categories = [
        "Healthcare Products",
        "Baby & Mother Care",
        "Wellness & Nutrition",
        "Personal Care",
    ];

    return (
        <>
            <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
                <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
                    {/* Left Section */}
                    <div className="flex items-center gap-9">
                        {/* Logo and Menu */}
                        <div className="flex items-center gap-2">
                            {!isLarge && (
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <h1
                                onClick={() => navigate("/")}
                                className="logo cursor-pointer text-lg md:text-2xl text-primary-color"
                            >
                                PharmaConnect
                            </h1>
                        </div>

                        {/* Categories */}
                        {isLarge && (
                            <ul className="flex items-center font-medium text-gray-800">
                                {categories.map((item) => (
                                    <li
                                        key={item}
                                        onMouseEnter={() => setHoveredCategory(item)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                        className="mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 lg:gap-6 w-full lg:w-auto">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>

                        {true ? (
                            <Button
                                onClick={() => navigate("/account/orders")}
                                className="flex items-center gap-2"
                            >
                                <Avatar
                                    sx={{ width: 29, height: 29 }}
                                    src="https://accounts.google.com/SignOutOptions?hl=en"
                                />
                                <h1 className="font-semibold hidden lg:block">Pharma</h1>
                            </Button>
                        ) : (
                            <Button variant="contained">Login</Button>
                        )}

                        <IconButton>
                            <FavoriteBorder sx={{ fontSize: 29 }} />
                        </IconButton>

                        <IconButton onClick={() => navigate("/cart")}>
                            <AddShoppingCart className="text-gray-700" sx={{ fontSize: 29 }} />
                        </IconButton>

                        {isLarge && (
                            <Button
                                onClick={()=>navigate("/become-seller")}
                                startIcon={<Storefront />}
                                variant="outlined"
                                sx={{
                                    ml: 'auto',
                                    whiteSpace: 'nowrap',
                                    height: '36px',
                                }}
                            >
                                Become Seller
                            </Button>
                        )}
                    </div>
                </div>

                {/* Category Sheet Dropdown */}
                {isLarge && hoveredCategory && (
                    <div
                        className="categorySheet absolute top-[4.41rem] left-20 right-20 border bg-white"
                        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <CategorySheet selectedCategory={hoveredCategory} />
                    </div>
                )}
            </Box>
        </>
    );
};

export default Navbar;
