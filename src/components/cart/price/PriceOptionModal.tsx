import React from 'react'

import MyModal from '../../common/Modal'
import { PriceRow } from '../../types/types'
import { PriceTableComponent } from './PriceTableComponent'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  productOption: PriceRow[]
}

export const PriceOptionModal = ({ isOpen, setIsOpen, productOption }: Props) => {
  return (
    <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <PriceTableComponent priceData={productOption} onChange={() => {}} />
    </MyModal>
  )
}
