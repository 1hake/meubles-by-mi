import '../hooks/init'

import React from 'react'

import { ProductsShowCase } from '../components/ProductsShowCase'
import { Services } from '../components/Services'

export const Home = () => {
  return (
    <>
      {/* <Showcase limit={true} /> */}
      <Services />
      {/* <ShowcaseIntro></ShowcaseIntro> */}
      <ProductsShowCase limit={true} />
      {/* <Works /> */}
      {/* <ImagePanel /> */}
      {/* <About /> */}
    </>
  )
}
