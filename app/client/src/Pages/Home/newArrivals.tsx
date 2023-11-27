import { data } from "../../Components/products.json";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

export default function NewArrivals() {
	const products = data.map((product) => {
		return (
			<SplideSlide
				key={product.itemId}
				className="newArrivalProduct flex flex-col gap-4 items-center text-center overflow-hidden"
			>
				<img
					className="productCard flex-grow rounded-lg"
					src={product.image}
					alt=""
				/>
				<div>
					<h1 className="text-lg font-semibold">{product.title}</h1>
					<p className="text-violet-800 font-medium">{product.price}.00$</p>
				</div>
			</SplideSlide>
		);
	});

	const splideOptions = {
		perPage: 4,
		perMove: 1,
		width: "100%",
		gap: "2rem",
		padding: "1rem",
		pagination: false,
		breakpoints: {
			1280: {
				perPage: 3,
				gap: "1.5rem",
				padding: "0.75rem",
			},
			768: {
				perPage: 2,
				gap: "1rem",
				padding: "0.75rem",
			},
			640: {
				perPage: 1,
				padding: "0.75rem",
			},
		},
	};

	return (
		<div className="flex w-full sm:w-4/5">
			<Splide hasTrack={false} aria-label="..." options={splideOptions}>
				<SplideTrack>{products}</SplideTrack>
			</Splide>
		</div>
	);
}
