'use client';

import { Product } from "@/products/data/products";
import { addProductToCart, removeProductFromCart } from "@/shopping-cart/actions/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {

  const router = useRouter();

  const handleAddToCart = async (productId: string) => {
    try {
      await addProductToCart(productId);

      router.refresh(); // Refresh the page to update the cart count

      // Optionally, you can show a success message or update the UI
      console.log(`${product.name} added to cart`);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    // Implement remove from cart functionality here
    await removeProductFromCart(productId);

    router.refresh(); // Refresh the page to update the cart count

    // Optionally, you can show a success message or update the UI
    console.log(`${product.name} removed from cart`);
  };

  return (
    <div className="bg-white shadow rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-100">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={product.image}
          alt="product image"
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
            { product.name }
          </h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Stars */}

          {
            Array.from({ length: product.rating }).map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))
          }

          {/* Rating Number */}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {product.rating}.0
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex">
            <button onClick={() => handleAddToCart(product.id) } className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <IoAddCircleOutline size={25} />
            </button>
            <button onClick={() => handleRemoveFromCart(product.id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
