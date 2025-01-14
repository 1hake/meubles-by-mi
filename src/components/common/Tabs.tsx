import { Tab } from '@headlessui/react'
import React, { ReactNode } from 'react'

import Button from './Button'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Categories = {
  [key: string]: ReactNode
}

interface MyTabProps {
  categories: Categories
}

export default function MyTab({ categories }: MyTabProps) {
  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl  p-1 gap-2">
          {Object.keys(categories).map((category) => (
            <Tab key={category}>
              {({ selected }) => (
                <Button className={`text-sm ${selected ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}>
                  {category}
                </Button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((Component, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {Component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
