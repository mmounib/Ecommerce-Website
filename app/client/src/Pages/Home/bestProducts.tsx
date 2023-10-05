import {nanoid} from 'nanoid';
import accessoriesCategory from "../../assets/accessoriesCategory.jpeg"
import kidsCategory from "../../assets/kidsCategory.jpeg"

import StyledCard from '../../Components/StyledCard';
import ForwardButton from "../../assets/icons/Forward-Button.png"
import { Link } from 'react-router-dom';

export default function BestProducts() {

    const data = [
        {id: nanoid(), to: '/', image: accessoriesCategory, style: false},
        {id: nanoid(), to: '/', image: kidsCategory, style: true},
        {id: nanoid(), to: '/', image: kidsCategory, style: true},
        {id: nanoid(), to: '/', image: kidsCategory, style: false}
    ]

    const bestProducts = data.map(item => {
        return (
            <div key={item.id} className={`relative mt-0 ${item.style ? 'xl:mt-12' : ''}`}>
                <Link to={item.to}><img className='absolute z-50 -top-2 -right-2' src={ForwardButton} alt='' /></Link>
                <StyledCard image={item.image} />
            </div>
        )
    })
  return (
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
        {bestProducts}
    </div>
  )
}
