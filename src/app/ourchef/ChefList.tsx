"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getData } from "./getData"

type Chef = {
  _id: string
  name: string
  position: string
  imageUrl: string
  description: string
}

export default function ChefList() {
  const [data, setData] = useState<Chef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getData()
      .then((chefs) => {
        setData(chefs)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching chefs:", err)
        setError("Failed to load chefs. Please try again later.")
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p className="text-center text-lg">Loading...</p>
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>

  return (
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
                    src={chef.imageUrl || "/placeholder.svg"}
                    alt={`Chef ${chef.name} - ${chef.position}`}
                    className="object-cover w-full h-full"
                    width={400}
                    height={400}
                    priority={data.indexOf(chef) < 2}
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
  )
}
