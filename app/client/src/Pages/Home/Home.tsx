import NewArrivals from "./newArrivals";
import Explore from "./explore";
import BestProducts from "./bestProducts";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* cover */}
      <div className='cover w-full'></div>

      {/* newArrivals */}
      <section className='new_arrivals flex flex-col justify-evenly items-center'>
        <h1 className="font-semibold text-6xl">New Arrivals</h1>
        <NewArrivals />
      </section>

      {/* Explore Categories */}
      <section className='explore w-3/4 flex border-t-2 border-l-gray-400'>
        <Explore />
      </section>

      {/* BestSelling */}
      <section className='bestProducts flex flex-col w-full justify-evenly items-center'>
        <h1 className="font-semibold text-6xl">Best Selling Products</h1>
        <BestProducts />
      </section>
    </div>
  )
}
