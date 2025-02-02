import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { client } from '@/sanity/lib/client';
import Header from '@/components/layout/Header';

type FullProduct = {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
  name: string;
  price: number;
  description: string;
};

// Fetch products from Sanity CMS
async function getData() {
  try {
    const query = `*[_type == "food"] {
      _id,
      name,
      price,
      description,
      image {
        asset -> {
          url
        }
      }
    }`;
    return await client.fetch<FullProduct[]>(query);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Newest() {
  const data = await getData();

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Shop
          </p>
        </div>
      </section>
        
      {/* Products Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {data.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No products available.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {data.map((product, index) => (
                <div key={product._id} className="group relative text-center">
                  <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                      priority={index < 2} // Optimize first two images
                    />
                  </div>

                  <div className="mt-4 flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
