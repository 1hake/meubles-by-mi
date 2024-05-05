export interface PriceRow {
  quantity: string
  price: string
}

export interface ShippingOptions {
  Belgique?: number | null
  Luxembourg?: number | null
  France?: number | null
}

export interface Image {
  image: string
  color?: string
}

export interface ProductVariant {
  color: string
  image: string
  quantity?: number
}

export interface FirestoreRef {
  converter: any
  _key: {
    path: {
      segments: string[]
      offset: number
      len: number
    }
  }
  type: string
  firestore: any
}

export interface Product {
  id: string
  name: string
  main_image: string
  related_images: string[]
  color_images: ProductVariant[]
  categories: string[]
  description: string
  priceOptions: PriceRow[]
  published: boolean
  promotion: boolean
  new: boolean
  facebookProductUrl: string
  shippingOptions: ShippingOptions
  ref: FirestoreRef
}

export interface CartItem {
  id: string
  name: string
  variants: ProductVariant[]
  ref: FirestoreRef
  priceOption: PriceRow[]
  shippingOptions: ShippingOptions
}

export type Country = 'Belgique' | 'Luxembourg' | 'France'
