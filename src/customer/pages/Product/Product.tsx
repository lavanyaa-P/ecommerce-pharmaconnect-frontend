import React, { useState } from "react";
import FilterSection from "./FilterSection";
import ProductCart from "./ProductCart";
import {
    Box,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { FilterAlt, Route } from "@mui/icons-material";
import { MemoryRouter, Routes } from "react-router-dom";

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [sort, setSort] = useState();
    const [page, setPage] = useState(1);

    const handleSortChange = (event: any) => {
        setSort(event.target.value);
    };

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    return (
        <div className="-z-10 mt-10">
            <div>
                <h1 className="text-3xl text-center font-bold text-[#003399] pb-5 px-9 uppercase space-x-2">
                    Digital Thermometers
                </h1>
            </div>

            <div className="lg:flex"> {/* Fixed typo: 'lg-flex' to 'lg:flex' */}
                <section className="filter_section hidden lg:block w-[20%]">
                    <FilterSection />
                </section>

                <div className="w-full lg:w-[80%] space-y-5 pl-4"> {/* Added pl-4 for spacing */}
                    <div className="flex justify-between items-center px-3 lg:px-0 h-[40px]">
                        <div className="relative w-[50%]">
                            {!isLarge && (
                                <IconButton>
                                    <FilterAlt />
                                </IconButton>
                            )}
                            {!isLarge && (
                                <Box>
                                    <FilterSection />
                                </Box>
                            )}
                        </div>


                        <FormControl
                            size="small"
                            sx={{
                                width: "180px",
                                marginRight: isLarge ? "40px" : "10px" // move it left on large screens
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                                <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Divider />

                    <section className="products_section pl-3 lg:pl-6 grid sm:grid-cols-2 md:grid-cols-3 lg:gride-cols-4 gap-y-5 px-5 justify-center">
                        {/* Added left padding so products align left and leave space for filter */}
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <ProductCart />)}

                    </section>
                    <div className='flex justify-center py-15'>
                        <Typography>Page: {page}</Typography>
                        <Pagination
                            count={10}
                            page={page}
                            onChange={(e,value)=>handlePageChange(value)}
                            color = "primary"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#003399",
                                    borderColor: "#003399"
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#003399",
                                    color: "#fff",
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
