import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
const [mobile, setMobile] = useState('')
const navigate = useNavigate()


const handleSubmit = (e) => {
e.preventDefault()
const cleaned = mobile.replace(/\D/g, '')
if (cleaned.length !== 10) {
alert('Enter a valid 10-digit mobile number')
return
}

localStorage.setItem('mobile', cleaned)
navigate('/otp')
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
<form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
<h2 className="text-2xl font-bold mb-4">Enter mobile number</h2>
<div>
<input
className="w-full border p-3 rounded focus:outline-none"
placeholder="10-digit mobile number"
value={mobile}
onChange={(e) => setMobile(e.target.value)}
inputMode="numeric"
/>
</div>
<button className="mt-4 w-full bg-blue-600 text-white p-3 rounded">Send OTP</button>
</form>
</div>
)
}