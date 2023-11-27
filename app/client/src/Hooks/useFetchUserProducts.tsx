import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useEffectOnUpdate, useRequest } from ".";
import { Link } from "react-router-dom";

export function useFetchUserProducts(header: string) {
	const [list, setList] = useState([]);
	useEffectOnUpdate(() => {
		const Fetch = async () => {
			const opt: AxiosRequestConfig = {
				url: `/api/user/${header.split(" ")[1]}List`,
				method: "GET",
			};
			const res = await useRequest(opt);
			setList(res?.data);
		};
		void Fetch();
	}, []);

	const products = list?.map(
		(item: { id: string; image: string[]; title: string; price: string }) => {
			return (
				<Link
					to={`/product/${item.id}`}
					className="flex gap-8 justify-start w-full pr-6 rounded-lg profileCards"
					key={item.id}
				>
					<img
						className="productCard w-36 h-44 rounded-lg"
						src={`https://${item.image[0]}`}
						alt=""
					/>
					<div className="flex flex-col items-start w-full">
						<h1 className="text-sm font-medium text-left ">{item.title}</h1>
						<p className="text-violet-800 font-medium text-left">
							{item.price} $
						</p>
					</div>
				</Link>
			);
		}
	);
	return products;
}
