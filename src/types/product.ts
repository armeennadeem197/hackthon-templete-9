export interface Product {
    _id: string
    name: string
    slug: { current: string }
    image: string
    price: number
    description: string
    isVegetarian: boolean
    spicinessLevel?: number
    stockLevel: number
    discountPercentage?: number
    isFeaturedItem?: boolean
  }
  
  