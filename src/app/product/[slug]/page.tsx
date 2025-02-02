
"use client"; // This must be at the top
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPercentage: number;
  stockLevel: number;
  spicinessLevel: number;
  isVegetarian: boolean;
  isFeaturedItem: boolean;
  description: string;
  image: string;
  slug: { current: string };
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "menuItem" && slug.current == $slug][0]{
    id,
    name,
export default function ProductPage({ params }: { params: { slug: string } }) {
    discountPercentage,
  const [product, setProduct] = useState<Product | null>(null);
    spicinessLevel,
    isVegetarian,
    isFeaturedItem,
    description,
    "image": image.asset->url,
    slug
  }`;

  return await client.fetch(query, { slug });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart, totalItems } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProduct(params.slug).then(setProduct);
  }, [params.slug]);

  if (!product) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div>
      <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          <div className="relative">
            <Link href="/shoppingcart">
              <HiOutlineShoppingBag className="text-white text-[24px] cursor-pointer" />
              {totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {totalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 md:h-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            {product.discountPercentage > 0 && <p className="text-red-500 mb-4">{product.discountPercentage}% off!</p>}
            <p className="mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="mr-2">Spiciness Level:</span>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < product.spicinessLevel ? "text-red-500" : "text-gray-300"}`}>
                  🌶️
                </span>
              ))}
            </div>

            <p className="mb-4">{product.isVegetarian ? "🥬 Vegetarian" : "🍖 Non-Vegetarian"}</p>
            <p className="mb-4">Stock: {product.stockLevel > 0 ? "In Stock" : "Out of Stock"}</p>
            {product.isFeaturedItem && <p className="text-yellow-500 mb-4">⭐ Featured Item</p>}

            {/* 🛒 Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
