import React from 'react'

import Cart from '../components/Cart'
import { Footer } from '../components/Footer'
import ProductCategory from '../components/ProductCategory'
import ProductDetail from '../components/ProductDetail'
import { Home } from '../pages/Home'

interface Route {
  name: string
  path: string
  component: JSX.Element
  isAnonymous?: boolean
  isProtected?: boolean
}

export const routesConfig: Route[] = [
  {
    name: 'home',
    path: '/',
    component: <Home />
  },
  {
    name: 'Product',
    path: '/product/:id',
    component: <ProductDetail />
  },
  {
    name: 'Categories',
    path: '/categories/:category',
    component: <ProductCategory />
  },
  {
    name: 'Cart',
    path: '/cart',
    component: <Cart />
  },
  {
    name: 'contact',
    path: '/contact',
    component: <Footer />
  }
]
