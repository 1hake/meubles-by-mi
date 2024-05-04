import React from 'react'

import MyModal from './Modal'
import { PriceTableComponent } from './PriceTableComponent'
import { PriceRow } from './ProductDetail'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  productOption: PriceRow[]
}

export const PriceOptionModal: React.FC = ({ isOpen, setIsOpen, productOption }: Props) => {
  return (
    <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <PriceTableComponent priceData={productOption} onChange={() => {}} />
    </MyModal>
  )
}
