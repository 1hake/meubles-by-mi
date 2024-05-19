import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../common/Button'

const UserAuthentication: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="my-4 p-4 bg-gray-100 rounded-lg text-center flex flex-col justify-center gap-y-4">
      <p className="font-semibold text-gray-800">
        Veuillez vous connecter pour finaliser votre commande. Si vous n'avez pas de compte, inscrivez-vous.
      </p>
      <Button color="light" onClick={() => navigate('/signin/redirect')}>
        Se connecter
      </Button>
      <Button className="bg-gray-300 " color="light" onClick={() => navigate('/signup/redirect')}>
        S'inscrire
      </Button>
    </div>
  )
}

export default UserAuthentication
