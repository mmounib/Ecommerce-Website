import {data} from "../../Components/products.json"

export default function Explore() {

    const products = data.map(product => {
        return(
            <div key={product.itemId} className='product flex flex-col gap-4 items-center text-center overflow-hidden'>
                <img className='flex-grow rounded-lg' src={product.image} alt='' />
                <div>
                    <h1 className='text-lg font-semibold'>{product.title}</h1>
                    <p className='text-violet-800 font-medium'>{product.price}.00MAD</p>
                </div>
            </div>
        )
    })
  return (
    <div className='flex w-4/5'>
        {products}
    </div>
  )
}
