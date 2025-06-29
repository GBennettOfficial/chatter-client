import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore.js"

function App() {

  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const { theme } = useThemeStore()

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme} className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to='/'/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
