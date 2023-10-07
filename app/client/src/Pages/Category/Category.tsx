import { Link, useLocation } from 'react-router-dom'
import {data} from "../../Components/categoryProducts.json"
import { useEffect, useRef, useState } from 'react';
import { useEffectOnUpdate } from '../../Hooks/useEffectOnUpdate';
import axios from 'axios';
import CustomerReview from './customerReview';
import PriceField from './priceField';
import {priceRange} from "../../interfaces"


export default function Category() {
  const category = useRef<string>('')
  const [reviewRange, setReviewRange] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<priceRange>({} as priceRange)
  const {pathname} = useLocation()
  // Use a regular expression to extract the "anything" part
  const match = pathname.match(/\/category\/(.+)/);
  // The extracted value is in match[1]
  if (match)
    category.current = match[1];

  function resetInputs() {
    setReviewRange(0)
    setPriceRange({priceStart: '', priceEnd: ''})
  }

  useEffect(() => {
    console.log('here');    
    resetInputs()
  }, [category.current])

  function newData() {
    console.log('ok');
  }

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
  // }, [category.current, reviewRange])

  const productsList = data.map(item => {
    return (
      <div className='product flex flex-col gap-4'>
        <Link to={`/product/${item.itemId}`}><img className='productCard w-64 h-96 rounded-lg' src={item.image} alt='' /></Link>
        <div>
          <h1 className='text-lg font-semibold'>{item.title}</h1>
          <p className='text-violet-800 font-medium'>{item.price}.00MAD</p>
        </div>
      </div>
    )
  })
  return (
    <section className='flex flex-col lg:flex-row w-10/12 justify-between gap-16 py-24'>
      <div className='filter lg:w-1/4 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <p className='font-semibold text-xl'>Filter:</p>
          <p className='font-medium cursor-pointer' onClick={resetInputs}>Reset all</p>
        </div>
        <CustomerReview setReviewRange={setReviewRange} reviewRange={reviewRange} />
        <PriceField priceRange={priceRange} setPriceRange={setPriceRange} fetchData={newData} />
      </div>
      <div className='flex lg:w-3/4 flex-wrap gap-8 justify-center'>
        {productsList}
      </div>
    </section>
  )
}
