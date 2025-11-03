import React from 'react'
import { useNavigate } from 'react-router-dom'


const RestaurantCard = ({ item }) => {
const nav = useNavigate()
return (
<div
onClick={() => nav(`/detail/${item.id}`)}
className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition p-0"
>
<img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover" />
<div className="p-4">
<h3 className="font-semibold text-lg">{item.name}</h3>
<p className="text-sm text-gray-500">{item.address}</p>
<div className="mt-2 text-sm">⭐ {item.rating}</div>
</div>
</div>
)
}


export default RestaurantCard