import React from 'react'

import Admin from '../admin/Admin'
import ProductCategory from '../components/categories/ProductCategory'
import ProductsShowCase from '../components/categories/ProductsShowCase'
import { SignInForm } from '../components/Users/SignInForm'
import { SignUpForm } from '../components/Users/SignUpForm'
import UserOrdersPage from '../components/Users/UserOrders'
import Cart from '../pages/Cart'
import { ConfirmationPage } from '../pages/ConfirmationPage'
import { Contact } from '../pages/Contact'
import { Home } from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Profile from '../pages/Profile'

interface Route {
  name: string
  path: string
  component: JSX.Element
  isAnonymous?: boolean
  isProtected?: boolean
  hasFooter?: boolean
}

export const routesConfig: Route[] = [
  {
    name: 'home',
    path: '/',
    component: <Home />,
    hasFooter: true
  },
  {
    name: 'Product',
    path: '/product/:id',
    component: <ProductDetail />
  },
  {
    name: 'All Products',
    path: 'categories/products',
    component: <ProductsShowCase />
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
    component: <Contact />
  },
  {
    name: 'signin',
    path: '/signin/:redirect?',
    component: <SignInForm />
  },
  {
    name: 'signup',
    path: '/signup/:redirect?',
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
    component: <Profile />
  },
  {
    name: 'admin',
    path: '/admin',
    component: <Admin />
  }
]
