import { CartItem, Country, PriceRow, ProductVariant } from '../components/types/types'

// Function to calculate the standard price for a batch of items based on the smallest unit price
export const calculateStandardPrice = (batchItems: ProductVariant[], priceOptions: PriceRow[]): number => {
  const totalQuantity = batchItems.reduce((total, item) => total + item.quantity, 0)
  const sortedPriceOptions = priceOptions.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity))
  const smallestUnitPrice = parseInt(sortedPriceOptions[0].price)

  return totalQuantity * smallestUnitPrice
}

// Function to calculate the total price for a batch of items considering exact match for total quantity or the standard price otherwise
export const calculateTotalPrice = (batchItems: ProductVariant[], priceOptions: PriceRow[]): number => {
  const totalQuantity = batchItems.reduce((total, item) => total + item.quantity, 0)
  const priceOption = priceOptions.find((option) => parseInt(option.quantity) === totalQuantity)

  return priceOption ? parseInt(priceOption.price) : calculateStandardPrice(batchItems, priceOptions)
}

// Function to calculate the overall cart price including item prices and shipping based on country
export const calculateCartPrice = (cart: CartItem[], country: Country): number => {
  return cart.reduce((total, item) => {
    const totalPrice = calculateTotalPrice(item.variants, item.priceOption)
    const shippingCost = item.shippingOptions[country] ?? 10 // Default shipping cost if not defined

    return total + totalPrice + shippingCost
  }, 0)
}
