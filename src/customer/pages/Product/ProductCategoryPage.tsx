import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import ProductCart from "./ProductCart";

const ProductCategoryPage = () => {
  const { categorySlug } = useParams(); // 👈 ex: "digital_thermometers"
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);

  // ✅ Fetch only products for this category
  useEffect(() => {
    if (categorySlug) {
      dispatch(fetchAllProducts({ category: categorySlug }));
    }
  }, [dispatch, categorySlug]);

  return (
    <div className="px-5 py-10">
      <h1 className="text-2xl font-bold mb-5 capitalize text-[#003399]">
        {categorySlug?.replace(/_/g, " ")} Products
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCart
              key={product.id}
              id={product.id}
              title={product.title}
              name={product.title}
              categoryId={product.category?.categoryId || ""}
              description={product.description}
              price={product.sellingPrice}
              originalPrice={product.mrpPrice}
              discount={`${product.discountPercent}% OFF`}
              images={product.images}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategoryPage;
