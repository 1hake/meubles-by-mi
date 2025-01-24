import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import MyTab from '../components/common/Tabs'
import UserOrdersPage from '../components/Users/UserOrders'
import UserProfileForm from '../components/Users/UserProfileForm'
import { useAuth } from '../context/AuthContext'
import { useUsers } from '../hooks/useUsers'

const Profile: React.FC = () => {
  const { currentUser } = useAuth()
  console.log('🚀 ~ currentUser:', currentUser)
  const { users, editUser, loading, error } = useUsers()
  const [userData, setUserData] = React.useState(null)
  console.log('🚀 ~ userData:', userData)

  useEffect(() => {
    const user = users.find((user) => user.id === currentUser.id)
    setUserData(user)
  }, [users])

  const handleEditUser = (updatedData) => {
    editUser(userData.userId, updatedData)
      .then(() => {
        toast.success('Vos informations ont été mises a jour')
      })
      .catch((err) => {
        console.error('Error updating user:', err)
      })
  }

  const categories = {
    'Mes commandes': <UserOrdersPage />,
    'Mes informations': loading ? (
      <p>Loading user data...</p>
    ) : error ? (
      <p>{error}</p>
    ) : userData ? (
      <UserProfileForm userData={userData} onEditUser={handleEditUser} />
    ) : (
      <p>No user data available.</p>
    )
  }

  return (
    <div className="flex w-full justify-center mt-4">
      <div className="w-full">
        <MyTab categories={categories} />
      </div>
    </div>
  )
}

export default Profile
