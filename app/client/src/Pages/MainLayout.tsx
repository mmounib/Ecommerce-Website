import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Support from './Support'
import paypal from '../assets/icons/paypal.svg'
import mastercard from '../assets/icons/mastercard.svg'
import visa from '../assets/icons/visa.svg'


export default function MainLayout() {
  const {pathname} = useLocation()
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex flex-col w-full top-0'>
        {pathname === '/' && <Support />}
        <Header />
      </div>
      <main className=''>
        <Outlet />
      </main>
      <footer className='flex items-center justify-between text-sm md:text-base px-12 lg:px-24 xl:px-32 py-7 border-t-2 border-l-gray-400'>
        <p>@ 2023 All rights reserved, developed by LEET</p>
        <div className='flex gap-2'>
          <p>Payment partners</p>
          <img className='w-6 h-6' src={paypal} alt='' />
          <img className='w-6 h-6' src={mastercard} alt='' />
          <img className='w-6 h-6' src={visa} alt='' />
        </div>
      </footer>
    </div>
  )
}
