import React from 'react'

import myImg from '../images/hero.jpg'
import { SectionTitle } from './SectionTitle'
import { Socials } from './Socials'

export const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 py-12">
      <div className="w-full md:w-6/12">
        <SectionTitle>Contact</SectionTitle>
        {/* <p className="text-md text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          veniam dolor consectetur pariatur explicabo, iure nulla. Dolor
          debitis, natus cum ad, fugiat excepturi minima culpa atque modi
          accusantium vel voluptatem?
        </p> */}
        <Socials></Socials>
        <a
          href="mailto:atelier.etch@gmail.com"
          className="block mt-3 text-md md:text-lg text-gray-700 dark:text-gray-300 underline decoration-1 hover:text-indigo-500 dark:hover:text-indigo-500"
        >
          hjdfhjss
        </a>
      </div>

      <img src={myImg} alt="Arfan" className="w-full md:w-6/12 rounded-lg object-cover" />
    </div>
  )
}
