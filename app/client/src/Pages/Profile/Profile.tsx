import { useFetchUserProducts } from "../../Hooks";

export default function Profile() {
	return (
		<section className="flex flex-col gap-16 justify-center items-center w-full px-[10%] py-[3%]">
			<div className="profileCards bg-gray-200 w-full h-56 p-[4%] flex items-center">
				<p className="text-3xl md:text-4xl xl:text-5xl font-semibold">
					<span className="text-5xl md:text-7xl xl:text-8xl">👋</span>{" "}
					<span className="text-3xl md:text-5xl xl:text-6xl">Hi,</span>{" "}
					<span>Oussama Ouazize</span>
				</p>
			</div>
			<div className="lists w-full flex flex-col md:flex-row gap-16">
				<List header="My wish list" />
				<List header="My wish list" />
				{/* <List header="My orders" /> */}
			</div>
		</section>
	);
}

function List({ header }: { header: string }) {
	const products = useFetchUserProducts(header);
	return (
		<div className="profileCards w-full h-[38vh] flex flex-col gap-6 pl-6 lg:pl-12 pr-8 py-6 items-start overflow-hidden">
			<h1 className="text-2xl font-semibold">{header}</h1>
			<figure className="list w-full flex flex-col gap-8 h-full overflow-x-hidden overflow-y-scroll">
				{products}
			</figure>
		</div>
	);
}
