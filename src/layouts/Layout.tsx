import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { ToastContainer } from 'react-toastify'

import { HeaderBar } from '../components/menu/HeaderBar'

export const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer theme="colored" autoClose={1000} />

      <div className="bg-white min-h-screen gap-4 font-inter flex flex-col justify-between transition duration-1000 ease-in-out">
        <HeaderBar />
        <div className="max-w-8xl px-4 lg:px-6 lg:pt-4">{children}</div>
      </div>
    </>
  )
}
