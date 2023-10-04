import {nanoid} from 'nanoid'
import { Link } from 'react-router-dom'
import shoppingList from '../assets/icons/shoppingList.svg'
import profile from '../assets/icons/profile.svg'


export default function Header() {

  const allLinks = [
    {id: nanoid() ,to:"/category/kids",value: "kids"},
    {id: nanoid() ,to:`/category/accessories` ,value: "accessories"},
    {id: nanoid() ,to:"/category/electronics",value: "electronics"},
    {id: nanoid() ,to:"/category/clothes",value: "clothes"},
  ]

  const navbar = allLinks.map(item => {
    return (
      <Link key={item.id} to={item.to}>{item.value}</Link>
    )
  })

  return (
    <header className='flex justify-between items-center text-xl px-24 py-7 border-b-2 border-l-gray-400'>
      <Link to="/" className='text-2xl font-bold'>MarketHub</Link>
      <ul className='flex gap-16'>{navbar}</ul>
      <div className='flex gap-4'>
        <img className='w-6 h-6' src={shoppingList} alt='' />
        <img className='w-6 h-6' src={profile} alt='' />
      </div>
    </header>
  )
}
