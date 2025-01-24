import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { HeaderBar } from '../components/menu/HeaderBar'
import { routesConfig } from '../router/RoutesConfig'

export const Layout = ({ children }) => {
  const location = useLocation()

  const currentConfig = routesConfig.find((route) => route.path === location.pathname)

  return (
    <>
      <ToastContainer theme="colored" autoClose={1000} />

      <div className="bg-white min-h-screen gap-4 font-inter flex flex-col flex-start transition duration-1000 ease-in-out">
        <HeaderBar />
        <div className="max-w-8xl px-4 lg:px-6 lg:pt-4">{children}</div>
        {/* {currentConfig?.hasFooter && <Footer />} */}
      </div>
    </>
  )
}
