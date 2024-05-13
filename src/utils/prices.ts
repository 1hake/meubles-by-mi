import { BatchItem, CartItem, ColorImage, Country, PriceRow } from '../components/types/types'

export const calculatePriceByColor = (batchItems: BatchItem[], colorImages: ColorImage[]): number => {
  console.log('🚀 ~ calculatePriceByColor ~ colorImages:', colorImages)
  return batchItems.reduce((total, item) => {
    const correspondingColorImage = colorImages.find((ci) => ci.color === item.color)
    if (!correspondingColorImage) {
      return total
    }
    return total + correspondingColorImage.price * item.quantity
  }, 0)
}

export const calculateStandardPrice = (batchItems: BatchItem[], priceOptions: PriceRow[]): number => {
  if (priceOptions.length === 0) {
    return 0
  }
  const totalQuantity = batchItems.reduce((total, item) => total + item.quantity, 0)
  const sortedPriceOptions = priceOptions.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity))
  const smallestUnitPrice = parseInt(sortedPriceOptions[0].price)

  return totalQuantity * smallestUnitPrice
}

export const calculateTotalPrice = (batchItems: BatchItem[], priceOptions: PriceRow[]): number => {
  console.log('🚀 ~ calculateTotalPrice ~ priceOptions:', priceOptions)
  const totalQuantity = batchItems.reduce((total, item) => total + item.quantity, 0)
  const correspondingPriceOption = priceOptions.find((po) => parseInt(po.quantity) === totalQuantity)

  if (!correspondingPriceOption) {
    return calculateStandardPrice(batchItems, priceOptions)
  }

  return parseInt(correspondingPriceOption?.price || '0')
}

export const calculateCartPrice = (cart: CartItem[], country: Country): number => {
  return cart.reduce((total, item) => {
    const totalPrice = calculateTotalPrice(item.variants, item.priceOption || [])
    const shippingCost = item.shippingOptions[country] ?? 10 // Default shipping cost if not defined

    return total + totalPrice + shippingCost
  }, 0)
}
