import React from 'react'

const UserAuthentication: React.FC = () => {
  return (
    <div className="my-4 p-4 bg-gray-100 rounded-lg text-center shadow-md flex flex-col justify-center">
      <p className="font-semibold text-gray-800">
        Veuillez vous connecter pour finaliser votre commande. Si vous n'avez pas de compte, inscrivez-vous.
      </p>
      <a
        href="/signin/redirect"
        className="mt-2 inline-block text-white bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded"
      >
        Se connecter
      </a>
      <a
        href="/signup/redirect"
        className="mt-2 inline-block text-black bg-white hover:bg-gray-300 font-bold py-2 px-4 rounded border border-black"
      >
        S'inscrire
      </a>
    </div>
  )
}

export default UserAuthentication
