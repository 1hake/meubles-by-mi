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
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        className={`transition rounded-md  hover:-translate-y-2 transform duration-500 ease-in-out`}
      >
        <div className="bg-black bg-opacity-50 rounded-md hover:bg-opacity-0 transition ease-in-out duration-500 border-2 border-black">
          <div className="p-5 h-44 flex flex-col justify-center text-center">
            <h1 className="font-bold text-2xl  text-white  mb-1">{title.toLocaleUpperCase()}</h1>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategorieBlock
