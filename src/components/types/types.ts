export interface PriceRow {
  quantity: string
  price: string
}

export interface ShippingOptions {
  Belgique?: number | null
  Luxembourg?: number | null
  France?: number | null
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  postalCode: string
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
  color_images: ColorImage[]
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

interface ColorImage {
  color: string
  image: string
  availableQuantity: number
}

export interface CartItem {
  id: string
  name: string
  variants: ProductVariant[]
  ref: FirestoreRef
  priceOption: PriceRow[]
  shippingOptions: ShippingOptions
}

export interface OrderInfo {
  userId: string | null
  products: { productId: FirestoreRef; variant: ProductVariant[] }[]
  shippingAddress: ShippingAddress
}

export type Country = 'Belgique' | 'Luxembourg' | 'France'

export type Status = 'en attente' | 'en cours de livraison' | 'livré'

export interface Order {
  userId: string
  products: Array<{
    productId: string
    quantity: number
    color?: string
  }>
  orderDate: Date
  shippingAddress: ShippingAddress
  status?: Status
}
