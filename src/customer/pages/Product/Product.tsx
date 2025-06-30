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
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

// All 30 products (your original 20 + 10 additional healthcare items)
const productList = [
  {
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
    name: "Ibuprofen",
    description: "Pain reliever and anti-inflammatory",
    price: 30,
    originalPrice: 40,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/b/r/bru0001.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/b/r/bru0001_2.jpg",
    ],
  },
  {
    name: "Aspirin (Ecosprin)",
    description: "Blood thinner, pain relief",
    price: 22,
    originalPrice: 30,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/406513/ecosprin_av_75mg_capsule_15s_49093_0_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/406513/ecosprin_av_75mg_capsule_15s_451041_1_1.jpg",
    ],
  },
  {
    name: "Cetirizine (Cetzine)",
    description: "Allergy, cold",
    price: 18,
    originalPrice: 25,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/303682/cetcip_10mg_tablet_10s_583836_1_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/303682/cetcip_10mg_tablet_10s_37743_0_2.jpg",
    ],
  },
  {
    name: "Dolo 650",
    description: "Fever, cold",
    price: 28,
    originalPrice: 35,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/45296/dolo_650_tablet_15s_549539_1_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/45296/dolo_650_tablet_15s_35281_0_3.jpg",
    ],
  },
  {
    name: "Benadryl Syrup",
    description: "Cough relief",
    price: 80,
    originalPrice: 90,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/b/e/ben0005_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/b/e/ben0005_2.jpg",
    ],
  },
  {
    name: "Vicks Action 500",
    description: "Cold and flu symptoms",
    price: 32,
    originalPrice: 40,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/960962/vicks_action_500_advanced_tablet_10s_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/960962/vicks_action_500_advanced_tablet_10s_397938_1_0.jpg",
    ],
  },
  {
    name: "Pantoprazole (Pantocid)",
    description: "Acidity control",
    price: 50,
    originalPrice: 65,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAN0051_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/P/A/PAN0051_3_1.jpg",
    ],
  },
  {
    name: "Digene Tablets",
    description: "Indigestion relief",
    price: 42,
    originalPrice: 60,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/d/i/dig0019_1-feb24-_1_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/d/i/dig0019_1-feb24_1_.jpg",
    ],
  },
  {
    name: "Loperamide (Eldoper)",
    description: "Diarrhea control",
    price: 26,
    originalPrice: 35,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/44537/imodium_capsule_4s_35188_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/44537/imodium_capsule_4s_582501_1_0.jpg",
    ],
  },
  {
    name: "Azithromycin",
    description: "Bacterial infections",
    price: 75,
    originalPrice: 90,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/a/z/azi0013_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/a/z/azi0013_3.jpg",
    ],
  },
  {
    name: "Amoxicillin",
    description: "Broad spectrum antibiotic",
    price: 60,
    originalPrice: 80,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/A/L/ALM0123_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/A/L/ALM0123_2.jpg",
    ],
  },
  {
    name: "Savlon",
    description: "Antiseptic liquid",
    price: 115,
    originalPrice: 130,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/915930/savlon_antiseptic_disinfectant_liquid_1_litre_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/915930/savlon_antiseptic_disinfectant_liquid_1_litre_0_1.jpg",
    ],
  },
  {
    name: "Betadine Ointment",
    description: "Wound treatment",
    price: 90,
    originalPrice: 110,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/389969/betadine_ointment_250gm_46799_0_3.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/389969/betadine_ointment_250gm_546391_1_2.jpg",
    ],
  },
  {
    name: "Band-aids",
    description: "For small cuts and wounds",
    price: 20,
    originalPrice: 30,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/c/l/cli0043.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/c/l/cli0043_1.jpg",
    ],
  },
  {
    name: "Accu-Chek Strips",
    description: "Blood sugar test",
    price: 749,
    originalPrice: 999,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/g/l/glu0677-_1_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/g/l/glu0677-_4_.jpg",
    ],
  },
  {
    name: "Metformin",
    description: "Diabetes management",
    price: 65,
    originalPrice: 80,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/m/e/met0599.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/m/e/met0599_2.jpg",
    ],
  },
  {
    name: "Telmisartan",
    description: "Blood pressure control",
    price: 90,
    originalPrice: 110,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/T/E/TEL0079_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/T/E/TEL0079_2_1.jpg",
    ],
  },
  {
    name: "Vitamin C (Limcee)",
    description: "Immunity booster",
    price: 35,
    originalPrice: 50,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/l/i/lim0003_1_june23.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/L/I/LIM0003_3_1.jpg",
    ],
  },
  {
    name: "Zincovit",
    description: "Multivitamin supplement",
    price: 120,
    originalPrice: 160,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/986329/dr_morepen_multivitamin_tablet_women_60s_253143_0_1.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/986329/dr_morepen_multivitamin_tablet_women_60s_253144_2_1.jpg",
    ],
  },
  // Additional 10 items from your second message:
  {
    name: "Weighing Scale",
    description: "Digital personal weighing scale",
    price: 899,
    originalPrice: 1099,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/965271/dr_odin_electronic_personal_weighing_scale_black_eb_7010_224815_1_2.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/965271/dr_odin_electronic_personal_weighing_scale_black_eb_7010_224819_5_2.jpg",
    ],
  },
  {
    name: "Pouch Arm Sling",
    description: "Support sling for arm injuries",
    price: 120,
    originalPrice: 150,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/407764/tynor_pouch_arm_sling_baggy_l_c_06_50031_0_3.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/407764/tynor_pouch_arm_sling_baggy_l_c_06_361402_2_2.jpg",
    ],
  },
  {
    name: "Hot and Cold Pack",
    description: "Therapy for pain relief",
    price: 95,
    originalPrice: 120,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/d/r/drt0015_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/d/r/drt0015_5.jpg",
    ],
  },
  {
    name: "Venflon Pro",
    description: "IV cannula for injections",
    price: 35,
    originalPrice: 45,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/v/e/ven0093_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/v/e/ven0093_4.jpg",
    ],
  },
  {
    name: "Baby Detergent",
    description: "Delicate baby laundry detergent",
    price: 210,
    originalPrice: 250,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/1154149/chicco_sensitive_0_baby_laundry_detergent_delicate_flowers_1000_ml_791966_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/1154149/chicco_sensitive_0_baby_laundry_detergent_delicate_flowers_1000_ml_791966_0_0.jpg",
    ],
  },
  {
    name: "Baby Soap",
    description: "Mild body wash for kids",
    price: 120,
    originalPrice: 140,
    images: [
      "https://www.netmeds.com/images/product-v1/600x600/1005365/mamaearth_super_strawberry_body_wash_for_kids_300_ml_0_0.jpg",
      "https://www.netmeds.com/images/product-v1/600x600/1005365/mamaearth_super_strawberry_body_wash_for_kids_300_ml_1_0.jpg",
    ],
  },
  {
    name: "Baby Diaper",
    description: "Comfortable and dry diaper",
    price: 299,
    originalPrice: 350,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/m/a/mam0059_1-july_3_.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/m/a/mam0059_1-july_3_.jpg",
    ],
  },
  {
    name: "Stretch Mark Cream",
    description: "Prevents and fades stretch marks",
    price: 150,
    originalPrice: 180,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/S/T/STR0577_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/S/T/STR0577_5.jpg",
    ],
  },
  {
    name: "B-Complex Capsules",
    description: "Energy and nerve support",
    price: 80,
    originalPrice: 95,
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/B/E/BEC0083_1_1.jpg",
      "https://images.apollo247.in/pub/media/catalog/product/B/E/BEC0083_2_1.jpg",
    ],
  },
].map((item) => ({
  ...item,
  discount: `${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%`,
}));

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const productsPerPage = 10;

  // Sort logic
  const sortedProducts = [...productList].sort((a, b) => {
    if (sort === "price_low") return a.price - b.price;
    if (sort === "price_high") return b.price - a.price;
    return 0;
  });

  // Pagination logic
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
              <ProductCart key={index} {...product} />
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