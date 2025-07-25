import { ProductCard } from "@/components/products/ProductCard";

import { products } from "@/products/data/products"


export const metadata = {
  title: "Products",
  description: "Page to display products",
};

export default async function ProductsPage() {

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* ProductCard */}
        {
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </>
  );
}