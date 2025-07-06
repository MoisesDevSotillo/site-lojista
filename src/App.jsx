import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import ProductsScreen from './components/ProductsScreen'
import OrdersScreen from './components/OrdersScreen'
import SalesScreen from './components/SalesScreen'
import SettingsScreen from './components/SettingsScreen'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/products" 
            element={<ProductsScreen user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/orders" 
            element={<OrdersScreen user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/sales" 
            element={<SalesScreen user={user} onLogout={handleLogout} />} 
          />
          <Route 
            path="/settings" 
            element={<SettingsScreen user={user} onLogout={handleLogout} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

