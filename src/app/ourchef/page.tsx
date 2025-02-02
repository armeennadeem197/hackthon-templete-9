"use client"
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';

type Chef = {
  _id: string;
  name: string;
  position: string;
  imageUrl: string;
  description: string;
};

// Fetch chefs from Sanity CMS
async function getData() {
  try {
    const query = `*[_type == "chef"]{
      _id,
      name,
      position,
      "imageUrl": image.asset->url,
      description
    }`;
    const data: Chef[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching chefs:', error);
    return [];
  }
}

export default function Newest() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const chefs = await getData();
      setData(chefs);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header/>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Our Chef</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Chef
          </p>
        </div>
      </section>

      {/* Chefs Section */}
      <div className="max-w-screen-lg mx-auto my-6 px-4 sm:px-6 lg:px-8">
        {data.length === 0 ? (
          <p className="text-center text-lg">No chefs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((chef) => (
              <div key={chef._id} className="group relative text-center">
                <div className="p-4 max-w-md mx-auto">
                  <Link href={`/chef/${chef._id}`} className="block relative h-64 rounded overflow-hidden">
                    <Image
                      src={chef.imageUrl}
                      alt={`Chef ${chef.name} - ${chef.position}`}
                      className="object-cover w-full h-full"
                      width={400}
                      height={400}
                      priority={data.indexOf(chef) < 2} // Prioritize first 2 images
                    />
                  </Link>
                  <div className="mt-4 flex flex-col items-center">
                    <h3 className="text-lg text-gray-700 font-semibold hover:text-yellow-400">
                      <Link href={`/chef/${chef._id}`}>{chef.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-500">{chef.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
