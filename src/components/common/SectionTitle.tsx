import React from 'react'

interface Props {
  children: React.ReactNode
  id: string
}

export const SectionTitle = ({ children }: Props) => {
  return (
    <div className="flex flex-row items-center my-8">
      <span className="w-full h-0.5 bg-gray-400 mr-4"></span>
      <h1 className="whitespace-nowrap text-2xl lg:text-4xl font-light text-gray-700">{children}</h1>
      <span className="w-full h-0.5 bg-gray-400 ml-4"></span>
    </div>
  )
}
