import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  name: string
  image: string
  slug: { current: string }
  price: number
}

const ProductCard = ({ id, name, image, slug, price }: ProductCardProps) => {
  return (
    <Link href={`/product/${slug.current}`} className="group">
      <div className="lg:w-full md:w-1/2 p-4 w-full">
        <div className="block relative w-full h-[300px] rounded-lg overflow-hidden">
          <Image
            alt={name}
            src={image || "/placeholder.svg"}
            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium hover:text-yellow-500 transition-colors">
            {name}
          </h2>
          <p className="mt-1 text-yellow-500 font-semibold">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

