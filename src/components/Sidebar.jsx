import React, { useEffect } from 'react'

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
    const onlineUsers = [];
    useEffect(() => {
        getUsers()
    }, [getUsers])
  return (

    <div>Sidebar</div>
  )
}

export default Sidebar