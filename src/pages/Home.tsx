import '../hooks/init'

import React from 'react'

import { Categories } from '../components/categories/Categories'
import ProductsShowCase from '../components/categories/ProductsShowCase'

export const Home = () => {
  return (
    <>
      <Categories />
      <ProductsShowCase limit={true} />
    </>
  )
}
