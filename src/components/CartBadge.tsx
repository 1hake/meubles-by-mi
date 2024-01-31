import React from 'react'

const CartBadge = ({ itemCount }) => {
  if (itemCount === 0) {
    return null // Don't display the badge if there are no items
  }

  return (
    <span className="absolute top-0 right-0 block h-6 w-6 rounded-full  text-white bg-red-600 text-xs leading-6 text-center">
      {itemCount}
    </span>
  )
}

export default CartBadge
