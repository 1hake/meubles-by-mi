import React from 'react'

import { PriceOptionModal } from '../cart/price/PriceOptionModal'
import Button from '../common/Button'

interface ProductOptionsProps {
  openModal: (open: boolean) => void
  isModalOpen: boolean
  priceOptions: any
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ isModalOpen, openModal, priceOptions }) => {
  return (
    <>
      <Button onClick={() => openModal(true)}>Voir les options de prix</Button>
      <PriceOptionModal isOpen={isModalOpen} setIsOpen={openModal} productOption={priceOptions} />
    </>
  )
}

export default ProductOptions
