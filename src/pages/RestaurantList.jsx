import React, { useEffect, useState } from 'react'
import { fetchRestaurants } from '../api/apiService'
import RestaurantCard from '../components/RestaurantCard'


export default function RestaurantList() {
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(() => {
let mounted = true
fetchRestaurants()
.then(res => { if (mounted) setData(res.data) })
.catch(err => { if (mounted) setError(err.message) })
.finally(() => { if (mounted) setLoading(false) })
return () => { mounted = false }
}, [])


if (loading) return <div className="p-8">Loading...</div>
if (error) return <div className="p-8 text-red-500">Error: {error}</div>


return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="max-w-6xl mx-auto">
<header className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold">Nearby restaurants</h1>
<button onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href='/login' }} className="text-sm text-red-500">Logout</button>
</header>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{data.map(item => (
<RestaurantCard key={item.id} item={item} />
))}
</div>
</div>
</div>
)
}