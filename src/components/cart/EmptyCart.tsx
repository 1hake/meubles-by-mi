import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../common/Button'

const EmptyCard = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-sm mx-auto my-10 p-5  flex flex-col items-center justify-center h-96">
      <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-black mb-4" />
      <p className="text-black mb-4">Votre panier est vide</p>
      <Button color="light" onClick={() => navigate('/')}>
        Retour à la boutique
      </Button>
    </div>
  )
}

export default EmptyCard
