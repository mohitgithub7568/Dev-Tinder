import React, { use } from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile.jsx'
const Profile = () => {
  const user = useSelector((store) => store.user.user);

  return (
    <div>
      <EditProfile user={user} />
      
    </div>
  )
}

export default Profile
