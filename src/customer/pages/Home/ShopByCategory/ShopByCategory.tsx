import { useAppSelector } from "../../../../State/Store";
import ShopByCategoryCart from "./ShopByCategoryCart";

const ShopByCategory = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div className='flex flex-wrap justify-between lg:px-10 gap-7'>
      {customer.homeData?.medicineCategories.map((item) => (
        <ShopByCategoryCart key={item.categoryId} item={item} />
      ))}
    </div>
  );
};

export default ShopByCategory;

