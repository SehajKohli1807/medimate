import ProductItem from "@/Components/Products/ProductItem";
import data from "@/lib/data";

export default function Home() {
  return (
    <>
      <h2 className="text-2xl py-6">Latest Products</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem key={product.unique_index} product={product} />
        ))}
      </div>
    </>
  );
}
