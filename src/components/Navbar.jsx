import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { MessageSquare, LogOut, Settings, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg'>
      <div className='px-4 mx-auto h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className='w-9 h-9 rouded-lg bg-primary/10 flex items-center justify-center'>
                <MessageSquare className='w-5 h-5 text-primary' />
              </div>
              <h1 className='text-lg font-bold'>Chatter</h1>
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <Link to='/profile'
              className='btn btn-sm gap-2 transition-colors'>
              <User className='size-4' />
              <span className='hidden sm:inline'>Profile</span>
            </Link>
            <Link to='/settings'
              className='btn btn-sm gap-2 transition-colors'>
              <Settings className='size-4' />
              <span className='hidden sm:inline'>Settings</span>
            </Link>
            <button className='btn btn-sm flex gap-2 items-center' onClick={logout}>
              <LogOut className='size-4' />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar