import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  icon: string
  description: string
  background: string
  navigation?: string
}

const CategorieBlock = ({ title, icon, description, background, navigation }: Props) => {
  return (
    <Link to={`categories/${navigation}`}>
      <div className={`transition rounded-md  hover:-translate-y-2 transform duration-500 ease-in-out`}>
        <div className="bg-white bg-opacity-50 rounded-md hover:bg-opacity-0 transition ease-in-out duration-500 border-2 border-black">
          <div className="p-5 h-44 flex flex-col justify-center text-center items-center">
            <h1 className="font-bold text-2xl  text-black  mb-1">{title.toLocaleUpperCase()}</h1>
            <div alt="logo" className="h-24 bg-light-logo bg-no-repeat bg-center bg-contain w-32"></div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategorieBlock
