import React from 'react'

import services from '../../data/categories'
import { SectionTitle } from '../common/SectionTitle'
import CategorieBlock from './CategorieBlock'

export const Categories = () => {
  return (
    <div className="">
      <div className="">
        <SectionTitle>Catégories</SectionTitle>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}>
        {services.map((service) => (
          <CategorieBlock
            key={service.title}
            title={service.title}
            icon={service.icon}
            description={service.description}
            background={service.background}
            navigation={service.navigation}
          />
        ))}
      </div>
    </div>
  )
}
