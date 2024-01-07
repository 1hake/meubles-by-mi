import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Footer = () => {
  return (
    <div className="p-8 bg-slate-800 text-center text-gray-300 rounded-lg">
      <div className="md:flex md:justify-between md:items-center">
        <div className="md:w-1/2 md:text-left mb-4 md:mb-0 flex justify-center items-center gap-4">
          <a href="#" className="text-gray-500 hover:text-indigo-500 mx-2">
            <FontAwesomeIcon icon={faFacebook} size="4x" />
          </a>
          <a href="#" className="text-gray-500 hover:text-indigo-500 mx-2">
            <FontAwesomeIcon icon={faTwitter} size="4x" />
          </a>
          <a href="#" className="text-gray-500 hover:text-indigo-500 mx-2">
            <FontAwesomeIcon icon={faInstagram} size="4x" />
          </a>
        </div>

        <form className="md:w-1/2">
          <label htmlFor="email" className="block text-sm md:text-md">
            Adresse e-mail :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            placeholder="Entrez votre adresse e-mail"
            required
          />

          <label htmlFor="message" className="block mt-4 text-sm md:text-md">
            Message :
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md resize-none focus:outline-none focus:ring focus:border-indigo-300"
            placeholder="Écrivez votre message"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
          >
            Envoyer le message
          </button>
        </form>
      </div>

      <p className="text-sm mt-6 text-gray-500">© Colin Champdavoine 2023</p>
    </div>
  )
}
