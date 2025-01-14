import React from 'react'

import MyTab from '../components/common/Tabs'
import UserOrdersPage from '../components/Users/UserOrders'
import UserProfileForm from '../components/Users/UserProfileForm'
import { useAuth } from '../context/AuthContext'
import { useUsers } from '../hooks/useUsers'

const Profile: React.FC = () => {
  const { currentUser } = useAuth()
  const { getUserById, editUser } = useUsers()
  const [userData, setUserData] = React.useState(null)

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.uid) {
        const user = await getUserById(currentUser.uid)
        console.log('🚀 ~ fetchUserData ~ user:', user)
        setUserData(user)
      }
    }
    fetchUserData()
  }, [currentUser, getUserById])

  const handleEditUser = async (updatedData) => {
    if (currentUser && currentUser.uid) {
      await editUser(currentUser.uid, updatedData)
    }
  }

  const categories = {
    'Mes commandes': <UserOrdersPage />,
    'Mes informations': userData ? (
      <UserProfileForm userData={userData} onEditUser={handleEditUser} />
    ) : (
      <p>Loading user data...</p>
    )
  }

  return (
    <div className="flex h-screen w-full justify-center  px-4">
      <div className="w-full max-w-md">
        <MyTab categories={categories} />
      </div>
    </div>
  )
}

export default Profile
