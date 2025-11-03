import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Otp() {
const [otp, setOtp] = useState('')
const navigate = useNavigate()
const CORRECT_OTP = '123456'


const handleSubmit = (e) => {
e.preventDefault()
if (otp === CORRECT_OTP) {
localStorage.setItem('isAuthenticated', 'true')
navigate('/list')
} else {
alert('Invalid OTP. Try 123456')
}
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
<form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
<h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
<input
className="w-full border p-3 rounded focus:outline-none"
placeholder="6-digit OTP"
value={otp}
onChange={(e) => setOtp(e.target.value)}
/>
<button className="mt-4 w-full bg-green-600 text-white p-3 rounded">Verify</button>
</form>
</div>
)
}