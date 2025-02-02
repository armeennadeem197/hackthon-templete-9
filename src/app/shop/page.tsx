
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import Header from "@/components/layout/Header"
import ProductCard from "@/components/layout/ProductCard"

interface MenuItem {
  id: string
  name: string
  image: string
  slug: { current: string }
  price: number
  discountPercentage: number
  stockLevel: number
  isVegetarian: boolean
  spicinessLevel: number
  isFeaturedItem: boolean
  description: string
  _createdAt?: string
}

const Page = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [sortCriteria, setSortCriteria] = useState("Newest")

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await client.fetch(`*[_type == "menuItem"]{
          id,
          name,
          price,
          discountPercentage,
          stockLevel,
          spicinessLevel,
          isVegetarian,
          isFeaturedItem,
          description,
          "image": image.asset->url,
          slug { current }
        }`)
        setMenuItems(data)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      }
    }

    fetchMenuItems()
  }, [])

  const sortedMenuItems = [...menuItems].sort((a, b) => {
    if (sortCriteria === "Newest") {
      return new Date(b._createdAt || "").getTime() - new Date(a._createdAt || "").getTime()
    }
    if (sortCriteria === "Price: Low to High") {
      return a.price - b.price
    }
    if (sortCriteria === "Price: High to Low") {
      return b.price - a.price
    }
    return 0
  })

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Our Shop</h2>
          <p className="pt-[10px]">
            <Link href="/" className="text-yellow-400">
              Home
            </Link>{" "}
            › Shop
          </p>
        </div>
      </section>

      {/* Sort by Dropdown */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Sort by: </h1>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="Newest">Newest</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.length === 0 ? (
            <p className="text-center col-span-full py-8">No menu items available at the moment.</p>
          ) : (
            sortedMenuItems.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                image={item.image}
                slug={item.slug}
                price={item.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
