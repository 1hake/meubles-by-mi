import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 mt-8">
      <div className="flex flex-col items-center">
        <p className="text-lg mb-4">Contactez nous</p>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" aria-label="Facebook" className="text-white hover:text-blue-500">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="mailto:contact@votreentreprise.com" aria-label="Mail" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
          <a href="tel:+1234567890" aria-label="Phone" className="text-white hover:text-green-500">
            <FontAwesomeIcon icon={faPhone} size="2x" />
          </a>
        </div>
        <p className="text-xs mt-4">&copy; Designed by onehake</p>
      </div>
    </footer>
  )
}
