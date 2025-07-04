import React, { useEffect, useState } from "react";
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
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

// Static list of 30 products
export const productList = [
  {
    id: 1,
    name: "Paracetamol",
    description: "Fever and mild pain",
    price: 25,
    originalPrice: 30,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAC0003_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAC0003_2_1.jpg",
    ],
  },

  {
    id: 3,
    title: "aspirin-ecosprin",
    name: "Aspirin (Ecosprin)",
    description: "Blood thinner, pain relief",
    price: 22,
    originalPrice: 30,
    categoryId: 103,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/406513/ecosprin_av_75mg_capsule_15s_49093_0_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/406513/ecosprin_av_75mg_capsule_15s_451041_1_1.jpg",
    ],
  },
  {
    id: 4,
    title: "cetirizine-cetzine",
    name: "Cetirizine (Cetzine)",
    description: "Allergy, cold",
    price: 18,
    originalPrice: 25,
    categoryId: 104,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/303682/cetcip_10mg_tablet_10s_583836_1_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/303682/cetcip_10mg_tablet_10s_37743_0_2.jpg",
    ],
  },
  {
    id: 5,
    title: "dolo-650",
    name: "Dolo 650",
    description: "Fever, cold",
    price: 28,
    originalPrice: 35,
    categoryId: 105,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/45296/dolo_650_tablet_15s_549539_1_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/45296/dolo_650_tablet_15s_35281_0_3.jpg",
    ],
  },
  {
    id: 6,
    title: "benadryl-syrup",
    name: "Benadryl Syrup",
    description: "Cough relief",
    price: 80,
    originalPrice: 90,
    categoryId: 106,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/b/e/ben0005_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/b/e/ben0005_2.jpg",
    ],
  },
  {
    id: 7,
    title: "vicks-action",
    name: "Vicks Action 500",
    description: "Cold and flu symptoms",
    price: 32,
    originalPrice: 40,
    categoryId: 107,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/960962/vicks_action_500_advanced_tablet_10s_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/960962/vicks_action_500_advanced_tablet_10s_397938_1_0.jpg",
    ],
  },
  {
    id: 8,
    title: "pantoprazole",
    name: "Pantoprazole (Pantocid)",
    description: "Acidity control",
    price: 50,
    originalPrice: 65,
    categoryId: 108,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAN0051_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAN0051_3_1.jpg",
    ],
  },
  {
    id: 9,
    title: "digene",
    name: "Digene Tablets",
    description: "Indigestion relief",
    price: 42,
    originalPrice: 60,
    categoryId: 109,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/d/i/dig0019_1-feb24-_1_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/d/i/dig0019_1-feb24_1_.jpg",
    ],
  },
  {
    id: 10,
    title: "loperamide",
    name: "Loperamide (Eldoper)",
    description: "Diarrhea control",
    price: 26,
    originalPrice: 35,
    categoryId: 110,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/44537/imodium_capsule_4s_35188_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/44537/imodium_capsule_4s_582501_1_0.jpg",
    ],
  },

  {
    id: 11,
    title: "azithromycin",
    name: "Azithromycin",
    description: "Bacterial infections",
    price: 75,
    originalPrice: 90,
    categoryId: 111,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/a/z/azi0013_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/a/z/azi0013_3.jpg",
    ],
  },
  {
    id: 12,
    title: "amoxicillin",
    name: "Amoxicillin",
    description: "Broad spectrum antibiotic",
    price: 60,
    originalPrice: 80,
    categoryId: 112,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/A/L/ALM0123_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/A/L/ALM0123_2.jpg",
    ],
  },
  {
    id: 13,
    title: "savlon",
    name: "Savlon",
    description: "Antiseptic liquid",
    price: 115,
    originalPrice: 130,
    categoryId: 113,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/915930/savlon_antiseptic_disinfectant_liquid_1_litre_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/915930/savlon_antiseptic_disinfectant_liquid_1_litre_0_1.jpg",
    ],
  },
  {
    id: 14,
    title: "betadine-ointment",
    name: "Betadine Ointment",
    description: "Wound treatment",
    price: 90,
    originalPrice: 110,
    categoryId: 114,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/389969/betadine_ointment_250gm_46799_0_3.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/389969/betadine_ointment_250gm_546391_1_2.jpg",
    ],
  },
  {
    id: 15,
    title: "band-aids",
    name: "Band-aids",
    description: "For small cuts and wounds",
    price: 20,
    originalPrice: 30,
    categoryId: 115,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/c/l/cli0043.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/c/l/cli0043_1.jpg",
    ],
  },
  {
    id: 16,
    title: "accu-chek-strips",
    name: "Accu-Chek Strips",
    description: "Blood sugar test",
    price: 749,
    originalPrice: 999,
    categoryId: 116,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/g/l/glu0677-_1_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/g/l/glu0677-_4_.jpg",
    ],
  },
  {
    id: 17,
    title: "metformin",
    name: "Metformin",
    description: "Diabetes management",
    price: 65,
    originalPrice: 80,
    categoryId: 117,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/m/e/met0599.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/m/e/met0599_2.jpg",
    ],
  },
  {
    id: 18,
    title: "telmisartan",
    name: "Telmisartan",
    description: "Blood pressure control",
    price: 90,
    originalPrice: 110,
    categoryId: 118,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/T/E/TEL0079_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/T/E/TEL0079_2_1.jpg",
    ],
  },
  {
    id: 19,
    title: "vitamin-c-limcee",
    name: "Vitamin C (Limcee)",
    description: "Immunity booster",
    price: 35,
    originalPrice: 50,
    categoryId: 119,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/l/i/lim0003_1_june23.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/L/I/LIM0003_3_1.jpg",
    ],
  },
  {
    id: 20,
    title: "zincovit",
    name: "Zincovit",
    description: "Multivitamin supplement",
    price: 120,
    originalPrice: 160,
    categoryId: 120,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/986329/dr_morepen_multivitamin_tablet_women_60s_253143_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/986329/dr_morepen_multivitamin_tablet_women_60s_253144_2_1.jpg",
    ],
  },
  {
    id: 21,
    title: "weighing-scale",
    name: "Weighing Scale",
    description: "Digital personal weighing scale",
    price: 899,
    originalPrice: 1099,
    categoryId: 121,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/965271/dr_odin_electronic_personal_weighing_scale_black_eb_7010_224815_1_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/965271/dr_odin_electronic_personal_weighing_scale_black_eb_7010_224819_5_2.jpg",
    ],
  },
  {
    id: 22,
    title: "pouch-arm-sling",
    name: "Pouch Arm Sling",
    description: "Support sling for arm injuries",
    price: 120,
    originalPrice: 150,
    categoryId: 122,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/407764/tynor_pouch_arm_sling_baggy_l_c_06_50031_0_3.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/407764/tynor_pouch_arm_sling_baggy_l_c_06_361402_2_2.jpg",
    ],
  },
  {
    id: 23,
    title: "hot-cold-pack",
    name: "Hot and Cold Pack",
    description: "Therapy for pain relief",
    price: 95,
    originalPrice: 120,
    categoryId: 123,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/d/r/drt0015_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/d/r/drt0015_5.jpg",
    ],
  },
  {
    id: 24,
    title: "venflon-pro",
    name: "Venflon Pro",
    description: "IV cannula for injections",
    price: 35,
    originalPrice: 45,
    categoryId: 124,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/v/e/ven0093_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/v/e/ven0093_4.jpg",
    ],
  },
  {
    id: 25,
    title: "baby-detergent",
    name: "Baby Detergent",
    description: "Delicate baby laundry detergent",
    price: 210,
    originalPrice: 250,
    categoryId: 125,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/1154149/chicco_sensitive_0_baby_laundry_detergent_delicate_flowers_1000_ml_791966_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/1154149/chicco_sensitive_0_baby_laundry_detergent_delicate_flowers_1000_ml_791966_0_0.jpg",
    ],
  },
  {
    id: 26,
    title: "baby-soap",
    name: "Baby Soap",
    description: "Mild body wash for kids",
    price: 120,
    originalPrice: 140,
    categoryId: 126,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/1005365/mamaearth_super_strawberry_body_wash_for_kids_300_ml_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/1005365/mamaearth_super_strawberry_body_wash_for_kids_300_ml_1_0.jpg",
    ],
  },
  {
    id: 27,
    title: "baby-diaper",
    name: "Baby Diaper",
    description: "Comfortable and dry diaper",
    price: 299,
    originalPrice: 350,
    categoryId: 127,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/m/a/mam0059_1-july_3_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/m/a/mam0059_1-july_3_.jpg",
    ],
  },
  {
    id: 28,
    title: "stretch-mark-cream",
    name: "Stretch Mark Cream",
    description: "Prevents and fades stretch marks",
    price: 150,
    originalPrice: 180,
    categoryId: 128,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/S/T/STR0577_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/S/T/STR0577_5.jpg",
    ],
  },
  {
    id: 29,
    title: "b-complex",
    name: "B-Complex Capsules",
    description: "Energy and nerve support",
    price: 80,
    originalPrice: 95,
    categoryId: 129,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/B/E/BEC0083_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/B/E/BEC0083_2_1.jpg",
    ],
  },
].map((item) => ({
  ...item,
  discount: `${Math.round(
    ((item.originalPrice - item.price) / item.originalPrice) * 100
  )}%`,
}));

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParam] = useSearchParams();
  const { category } = useParams();
  const { products, loading, error } = useAppSelector((store) => store.product);


  const productsPerPage = 10;

  const [minPrice, maxPrice] = searchParam.get("price")?.split("-")?.map(Number) || [];

  useEffect(() => {
    console.log("Current category:", category);
    dispatch(fetchAllProducts({ category }));
  }, [category]);
  

// Apply price filtering if values exist
const filteredProducts = productList.filter((product) => {
  if (!minPrice && !maxPrice) return true;
  const price = product.price;
  if (minPrice && maxPrice) return price >= minPrice && price <= maxPrice;
  if (minPrice) return price >= minPrice;
  if (maxPrice) return price <= maxPrice;
  return true;
});


  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price_low") return a.price - b.price;
    if (sort === "price_high") return b.price - a.price;
    return 0;
  });
  

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
    setPage(1); // Reset to page 1 when sorting
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
        {/* Sidebar Filter */}
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5 pl-4">
          {/* Top controls */}
          <div className="flex justify-between items-center px-3 lg:px-0 h-[40px]">
            {/* Mobile filter */}
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

            {/* Sorting */}
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

          {/* Product Cards */}
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

          {/* Pagination */}
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
