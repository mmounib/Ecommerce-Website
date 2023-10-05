import {nanoid} from 'nanoid';
import accessoriesCategory from "../../assets/accessoriesCategory.jpeg"
import kidsCategory from "../../assets/kidsCategory.jpeg"

import StyledCard from '../../Components/StyledCard';
import ForwardButton from "../../assets/icons/Forward-Button.png"
import { Link } from 'react-router-dom';

export default function BestProducts() {

    const data = [
        {id: nanoid(), to: '/', image: accessoriesCategory, style: {marginTop: '0'}},
        {id: nanoid(), to: '/', image: kidsCategory, style: {marginTop: '3rem'}},
        {id: nanoid(), to: '/', image: kidsCategory, style: {marginTop: '6rem'}},
        {id: nanoid(), to: '/', image: kidsCategory, style: {marginTop: '0'}}
    ]

    const bestProducts = data.map(item => {
        return (
            <div key={item.id} className='relative' style={item.style}>
                <Link to={item.to}><img className='absolute -top-2 -right-2' src={ForwardButton} alt='' /></Link>
                <StyledCard image={item.image} />
            </div>
        )
    })
  return (
    <div className='flex flex-wrap gap-8'>
        {bestProducts}
    </div>
  )
}
