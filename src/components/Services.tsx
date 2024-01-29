import { useState } from 'react'

import services from '../data/services'
import { SectionTitle } from './SectionTitle'
import ServiceItem from './ServiceItem'

export const Services = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleServices = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="">
      {/* Toggle visibility when the title is clicked */}
      <div onClick={toggleServices} className="cursor-pointer">
        <SectionTitle>Catégories</SectionTitle>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-500 ${
          isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        {services.map((service) => (
          <ServiceItem
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
