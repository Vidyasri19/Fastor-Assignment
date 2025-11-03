import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Otp from './pages/Otp'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'


const Protected = ({ children }) => {
const isAuth = localStorage.getItem('isAuthenticated') === 'true'
return isAuth ? children : <Navigate to="/login" replace />
}


export default function App() {
useEffect(() => {
document.title = 'Fastor — Nearby'
}, [])


return (
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />
<Route path="/otp" element={<Otp />} />
<Route path="/list" element={<Protected><RestaurantList /></Protected>} />
<Route path="/detail/:id" element={<Protected><RestaurantDetail /></Protected>} />
<Route path="*" element={<div className="p-8">404 — Not Found</div>} />
</Routes>
)
}