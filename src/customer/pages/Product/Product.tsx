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
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";

import FilterSection from "./FilterSection";
import ProductCart from "./ProductCart";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const { products: productList } = useAppSelector((store) => store.product);
  const productsPerPage = 10;

  const { category } = useParams();
  const [searchParam] = useSearchParams();
  const [minPrice, maxPrice] =
    searchParam.get("price")?.split("-")?.map(Number) || [];

  useEffect(() => {
    dispatch(fetchAllProducts({ category }));
  }, [category, dispatch]);

  const normalize = (val: any) =>
    typeof val === "string"
      ? val.trim().toLowerCase().replace(/\s+/g, "_").replace(/&/g, "and")
      : typeof val === "object" && val !== null && "name" in val && typeof val.name === "string"
      ? val.name.trim().toLowerCase().replace(/\s+/g, "_").replace(/&/g, "and")
      : "";

  const normalizedCategory = normalize(category || "");

  const categoryFiltered = normalizedCategory
    ? productList.filter((p) =>
        [p.category, p.subCategory, p.subSubCategory].some(
          (cat) => normalize(cat) === normalizedCategory
        )
      )
    : productList;

  const filteredProducts = categoryFiltered.filter((product) => {
    const price = product.price;
    if (minPrice && maxPrice) return price >= minPrice && price <= maxPrice;
    if (minPrice) return price >= minPrice;
    if (maxPrice) return price <= maxPrice;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price_low") return a.price - b.price;
    if (sort === "price_high") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  return (
    <div className="-z-10 mt-10">
      <h1 className="text-3xl text-center font-bold text-[#003399] pb-5 px-9 uppercase space-x-2">
        Products
      </h1>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5 pl-4">
          <div className="flex justify-between items-center px-3 lg:px-0 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <>
                  <IconButton>
                    <FilterAlt />
                  </IconButton>
                  <Box>
                    <FilterSection />
                  </Box>
                </>
              )}
            </div>

            <FormControl
              size="small"
              sx={{
                width: "180px",
                marginRight: isLarge ? "40px" : "10px",
              }}
            >
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          <section className="products_section pl-3 lg:pl-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {currentProducts.map((product, index) => (
              <ProductCart
                key={product.id ?? index}
                id={product.id}
                title={product.title ?? product.name}
                categoryId={product.categoryId ?? 0}
                name={product.name}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                images={product.images}
              />
            ))}
          </section>

          <div className="flex justify-center py-10 gap-5">
            <Typography>Page: {page}</Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#003399",
                  borderColor: "#003399",
                },
                "& .Mui-selected": {
                  backgroundColor: "#003399",
                  color: "#fff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
