import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '../context/AuthContext'
import CartProvider from '../context/CartContext'
import { FilterProvider } from '../hooks/useFilters'
import { Layout } from '../layouts/Layout'
import { routesConfig } from './RoutesConfig'

export const stripePromise = loadStripe(
  'pk_live_51OeZoPLTfd10N7e5PslZkPv3JWC2dPUPfjdy1aAblzL0VsMJ9D99Co1Im0hCyiCfXpkaxP8kDXhmefYDDsKyGwsV00uTxVy6Yz'
)

export const Router = () => {
  const publicRoutes = routesConfig.filter((route) => !route.isProtected && !route.isAnonymous)
  const anonymousRoutes = routesConfig.filter((route) => route.isAnonymous)
  const protectedRoutes = routesConfig.filter((route) => route.isProtected)

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <FilterProvider>
            <Layout>
              <Routes>
                {publicRoutes.map((route) => (
                  <Route key={route.name} path={route.path} element={route.component} />
                ))}
              </Routes>
            </Layout>
          </FilterProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
