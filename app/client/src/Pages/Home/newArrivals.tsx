import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import { useEffect, useState } from "react";
import { useRequest } from "../../Hooks";
import { cardList } from "../../interfaces";
import { Link } from "react-router-dom";

export default function NewArrivals() {
	const [newArrivals, setNewArrivals] = useState<cardList[]>([]);
	useEffect(() => {
		const Fetch = async () => {
			const res = await useRequest({
				url: "/api/product/newArrivals",
				method: "GET",
			});
			setNewArrivals(res?.data);
		};
		Fetch();
	}, []);

	const products = newArrivals.map((product) => {
		return (
			<SplideSlide
				key={product.id}
				className="newArrivalProduct flex flex-col gap-4 overflow-hidden"
			>
				<Link to={`/product/${product.id}`} className="productCard flex-grow rounded-lg">
					<img
						className="w-full h-full"
						src={product.image[0]}
						alt=""
					/>
				</Link>
				<div className="font-medium text-left">
					<h1 className="text-sm">{product.title}</h1>
					<p className="text-violet-800">{product.price} $</p>
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
