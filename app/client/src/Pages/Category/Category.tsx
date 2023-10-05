import { Link, useLocation } from 'react-router-dom'
import {data} from "../../Components/categoryProducts.json"
import { useRef, useState } from 'react';
import { useEffectOnUpdate } from '../../Hooks/useEffectOnUpdate';
import axios from 'axios';

export default function Category() {
  const category = useRef<string>('')
  const {pathname} = useLocation()
  // Use a regular expression to extract the "anything" part
  const match = pathname.match(/\/category\/(.+)/);
  // The extracted value is in match[1]
  if (match)
    category.current = match[1];

  // useEffectOnUpdate(() => {
  //   const fetchProducts = async () => {
  //     try {
  //         const res = await axios.get('')
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   void fetchProducts()
  // }, [category.current])

  const productsList = data.map(item => {
    return (
      <div className='product flex flex-col gap-4'>
        <Link to={`/product/${item.itemId}`}><img className='w-64 h-96 rounded-lg' src={item.image} alt='' /></Link>
        <div>
          <h1 className='text-lg font-semibold'>{item.title}</h1>
          <p className='text-violet-800 font-medium'>{item.price}.00MAD</p>
        </div>
      </div>
    )
  })
  return (
    <div className='flex flex-grow flex-wrap gap-8'>
      {productsList}
    </div>
  )
}
