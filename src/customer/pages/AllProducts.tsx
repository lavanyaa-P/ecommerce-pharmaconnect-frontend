import React, { useEffect } from "react";
import { fetchAllProducts } from "../../State/customer/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { Product } from "../../types/ProductTypes";
import ProductCart from "./Product/ProductCart";

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product: Product) => (
        <ProductCart
          key={product.id}
          id={product.id}
          title={product.title}
          name={product.title}
          description={product.description}
          price={product.sellingPrice}
          originalPrice={product.mrpPrice}
          discount={`${product.discountPercent}% OFF`}
          categoryId={product.category?.categoryId ?? "unknown"}
          images={product.images}
        />
      ))}
    </div>
  );
};

export default AllProducts;
