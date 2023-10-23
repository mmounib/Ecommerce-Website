import NewArrivals from "./newArrivals";
import Explore from "./explore";
import BestProducts from "./bestProducts";
import addToCard from "../../assets/icons/Add to Cart-amico.svg";

export default function Home() {

	return (
		<div className="flex flex-col justify-center items-center">
			<section className="cover bg-slate-100 flex flex-col md:flex-row w-full justify-evenly items-center">
				<div className="flex flex-col gap-4">
					<h1 className="text-6xl font-semibold">Shopping Online</h1>
					<p className="text-2xl font-light">Winter is coming!</p>
				</div>
				<img className="w-11/12 md:w-2/5" src={addToCard} alt="" />
			</section>

			{/* newArrivals */}
			<section className="new_arrivals flex w-full flex-col justify-evenly items-center">
				<h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl">
					New Arrivals
				</h1>
				<NewArrivals />
			</section>

			{/* Explore Categories */}
			<section className="explore w-3/4 hidden md:flex border-t-2 border-l-gray-400">
				<Explore />
			</section>

			{/* BestSelling */}
			<section className="bestProducts flex flex-col w-3/4 justify-evenly items-center mb-24">
				<h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl py-24">
					Best Selling Products
				</h1>
				<BestProducts />
			</section>
		</div>
	);
}
