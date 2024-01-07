import React, { createContext, useContext, useState } from 'react'

const FilterContext = createContext()

export const useFilter = () => {
  return useContext(FilterContext)
}

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc')

  const values = {
    selectedCategory,
    setSelectedCategory,
    sortByPrice,
    setSortByPrice,
    sortOrder,
    setSortOrder
  }

  return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
}
