import '../hooks/init'

import React from 'react'

import { Categories } from '../components/categories/Categories'
import Footer from '../layouts/Footer'

export const Home = () => {
  return (
    <>
      <Categories />
      {/* <ProductsShowCase limit={true} /> */}
      <Footer />
    </>
  )
}
