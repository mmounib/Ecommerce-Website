import StyledCard from '../../Components/StyledCard';
import ForwardButton from "../../assets/icons/Forward-Button.png"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRequest } from '../../Hooks';

export default function BestProducts() {

    const [products, setProducts] = useState<{id: string, image: string}[]>([]);
	useEffect(() => {
		const Fetch = async () => {
			const res = await useRequest({
				url: "/api/product/bestSales",
				method: "GET",
			});
			setProducts(res?.data);
		};
		Fetch();
	}, []);

    const bestProducts = products.map((item, index) => {
        return (
            <div key={item.id} className={`relative mt-0 ${(index % 2) ? '' : 'xl:mt-12'}`}>
                <Link to={`/product/${item.id}`}><img className='absolute z-50 -top-2 -right-2' src={ForwardButton} alt='' /></Link>
                <StyledCard id={item.id} image={item.image} />
            </div>
        )
    })
  return (
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
        {bestProducts}
    </div>
  )
}
