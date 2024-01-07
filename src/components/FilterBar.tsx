import React from 'react'

import { useFilter } from '../hooks/useFilters'

const FilterBar = ({}) => {
  const { selectedCategory, sortByPrice, sortOrder, setSelectedCategory, setSortByPrice, setSortOrder } = useFilter()
  return (
    <div className="flex justify-end mb-2">
      <label htmlFor="sortOrder" className="ml-4 mr-2">
        Trier par
      </label>
      <select
        id="sortOrder"
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        value={sortOrder}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
        <option value="asc">Plus récent</option>
      </select>
    </div>
  )
}

export default FilterBar
