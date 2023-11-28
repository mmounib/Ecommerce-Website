import { AxiosRequestConfig } from "axios";
import { useRef, useState } from "react";
import { Product } from "../../../server/dist/Types/types";
import { useEffectOnUpdate, useRequest } from ".";
import { Link, useLocation } from "react-router-dom";

export default function useFetchCategoryProducts() {
	const category = useRef<string>("");
	const [products, setProducts] = useState<Product[]>([]);
	const [reviewRange, setReviewRange] = useState<number>(0);
	const reset = useRef<boolean>(false);
	const { pathname } = useLocation();
	const match = pathname.match(/\/category\/(.+)/);
	if (match) category.current = match[1];
	useEffectOnUpdate(() => {
		const FetchProducts = async () => {
			const opt: AxiosRequestConfig = {
				url: `/api/product/categoryName/${category.current}`,
				method: "GET",
			};
			const res = await useRequest(opt);
			const data = res?.data.products as Product[];
			setProducts(data);
		};
		void FetchProducts();
	}, [category.current, reviewRange, reset.current]);

	const productsList = products?.map((item) => {
		return (
			<div className="product flex flex-col w-64 gap-4" key={item.id}>
				<Link to={`/product/${item.id}`}>
					<img
						className="productCard w-full h-96 rounded-lg"
						src={item.image[0]}
						alt=""
					/>
				</Link>
				<div>
					<h1 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
						{item.title}
					</h1>
					<p className="text-left text-violet-800 font-medium">{item.price} $</p>
				</div>
			</div>
		);
	});

	return {
		category,
		productsList,
		setProducts,
		reviewRange,
		setReviewRange,
		reset,
	};
}
