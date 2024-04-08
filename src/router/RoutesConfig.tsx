import React from 'react'

import { Cart } from '../components/Cart'
import { ConfirmationPage } from '../components/ConfirmationPage'
import { Footer } from '../components/Footer'
import ProductCategory from '../components/ProductCategory'
import ProductDetail from '../components/ProductDetail'
import SignInForm from '../components/Users/SignInForm'
import SignUpForm from '../components/Users/SignupForm'
import UserOrdersPage from '../components/Users/UserOrders'
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
  },
  {
    name: 'signin',
    path: '/signin',
    component: <SignInForm />
  },
  {
    name: 'signup',
    path: '/signup',
    component: <SignUpForm />
  },
  {
    name: 'confirmation',
    path: '/confirmation',
    component: <ConfirmationPage />
  },
  {
    name: 'user-profile',
    path: '/profile',
    component: <UserOrdersPage />
  }
]
