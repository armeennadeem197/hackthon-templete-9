import { client } from "@/sanity/lib/client"

type Chef = {
  _id: string
  name: string
  position: string
  imageUrl: string
  description: string
}

export async function getData(): Promise<Chef[]> {
  try {
    const query = `*[_type == "chef"]{
      _id,
      name,
      position,
      "imageUrl": image.asset->url,
      description
    }`
    const data: Chef[] = await client.fetch(query)
    return data
  } catch (error) {
    console.error("Error fetching chefs:", error)
    return []
  }
}

