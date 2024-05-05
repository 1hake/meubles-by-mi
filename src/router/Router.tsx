import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Admin from '../admin/Admin'
import { AuthProvider } from '../context/AuthContext'
import CartProvider from '../context/CartContext'
import { FilterProvider } from '../hooks/useFilters'
import { Layout } from '../layouts/Layout'
import { routesConfig } from './RoutesConfig'

export const stripePromise = loadStripe(
  'pk_test_51OeZoPLTfd10N7e5WDyEMkGQ6SSFVTeujXqBMbvTdMgmCT6fubXo40e4prZs9i5usLToLX6mnp3BGTDF40vtiqj4004189Kdu7'
)

export const Router = () => {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const params = new URLSearchParams(window.location.search)

  React.useEffect(() => {
    if (params.get('admin')) {
      setIsAdmin(true)
    }
  }, [params])

  const publicRoutes = routesConfig.filter((route) => !route.isProtected && !route.isAnonymous)
  const anonymousRoutes = routesConfig.filter((route) => route.isAnonymous)
  const protectedRoutes = routesConfig.filter((route) => route.isProtected)

  return isAdmin ? (
    <Admin />
  ) : (
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
