import { mockRestaurants } from './mockData'


export const fetchRestaurants = () => {
return new Promise((resolve) => {
setTimeout(() => resolve({ data: mockRestaurants }), 450)
})
}


export const fetchRestaurantById = (id) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
const r = mockRestaurants.find(item => item.id === id)
if (r) resolve({ data: r })
else reject(new Error('Not found'))
}, 300)
})
}