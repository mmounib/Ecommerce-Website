import NewArrivals from "./newArrivals";
import Explore from "./explore";


export default function Home() {
  return (
    <div>
      <div className='cover w-full flex justify-center items-center'>
      </div>
      <section className='new_arrivals flex flex-col justify-evenly items-center'>
        <h1 className="font-semibold text-6xl">New Arrivals</h1>
        <NewArrivals />
      </section>
      {/* <Explore /> */}
    </div>
  )
}
