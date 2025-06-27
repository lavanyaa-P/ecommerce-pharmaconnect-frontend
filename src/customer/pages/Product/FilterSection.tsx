import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";

const FilterSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const newParams = new URLSearchParams(searchParams.toString());

        if (value) {
            newParams.set(name, value);
        } else {
            newParams.delete(name);
        }

        setSearchParams(newParams);
    };

    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
    };

    return (
        <div className="-z-50 space-y-5 bg-white">
            <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
                <p className="text-lg font-semibold">Filter</p>
                <Button
                    onClick={clearAllFilters}
                    size="small"
                    className="text-teal-600 cursor-pointer font-semibold"
                >
                    Clear All
                </Button>
            </div>
            <Divider />

            <section className="px-5">
                <FormControl>
                    <FormLabel
                        sx={{ fontSize: "16px", fontWeight: "bold", color: "#003399", pb: "14px" }}
                        id="price"
                    >
                        Price
                    </FormLabel>
                    <RadioGroup onChange={updateFilterParams} name="price">
                        {price.map((item) => (
                            <FormControlLabel
                                key={item.name}
                                value={item.value}
                                control={<Radio size="small" />}
                                label={item.name}
                                
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </section>

            <Divider />

            <section className="px-5">
                <FormControl>
                    <FormLabel
                        sx={{ fontSize: "16px", fontWeight: "bold", color: "#003399", pb: "14px" }}
                        id="discount"
                    >
                        Discount
                    </FormLabel>
                    <RadioGroup onChange={updateFilterParams} name="discount">
                        {discount.map((item) => (
                            <FormControlLabel
                                key={item.name}
                                value={item.value}
                                control={<Radio size="small" />}
                                label={item.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </section>
        </div>
    );
};

export default FilterSection;
