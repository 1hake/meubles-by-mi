import { BatchItem, CartItem, ColorImage, Country, PriceRow } from '../components/types/types'

export const calculatePriceByColor = (batchItems: BatchItem[], colorImages: ColorImage[]): number => {
  return batchItems.reduce((total, item) => {
    const correspondingColorImage = colorImages.find((ci) => ci.color === item.color)
    if (!correspondingColorImage) {
      return total
    }
    return total + correspondingColorImage.price * item.quantity
  }, 0)
}

export const calculateTotalPrice = (batchItems: BatchItem[], priceOptions: PriceRow[]): number => {
  const totalQuantity = batchItems.reduce((total, item) => total + item.quantity, 0)
  const correspondingPriceOption = priceOptions.find((po) => parseInt(po.quantity) === totalQuantity)

  if (!correspondingPriceOption) {
    return totalQuantity * parseInt(priceOptions[0].price)
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
