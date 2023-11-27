import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import CustomerReview from "./customerReview";
import PriceField from "./priceField";
import { priceRange } from "../../interfaces";
import { useEffectOnUpdate, useRequest } from "../../Hooks";
import { Product } from "../../../../server/dist/Types/types";
import { FilterdData } from "../../interfaces";
import useFetchCategoryProducts from "../../Hooks/useFetchCategoryProducts";

export default function Category() {
	const [priceRange, setPriceRange] = useState<priceRange>({
		priceStart: "",
		priceEnd: "",
	});

	const {
		category,
		productsList,
		setProducts,
		reviewRange,
		setReviewRange,
		reset,
	} = useFetchCategoryProducts();

	function resetInputs() {
		setReviewRange(0);
		setPriceRange({ priceStart: "", priceEnd: "" });
		reset.current = !reset.current;
	}

	useEffectOnUpdate(() => {
		if (reviewRange || priceRange.priceStart !== "" || priceRange.priceEnd !== "")
			resetInputs();
	}, [category.current]);

	async function NewData() {
		const data: FilterdData = {
			stars: reviewRange,
			priceStart: priceRange.priceStart === "" ? "0" : priceRange.priceStart,
			priceEnd: priceRange.priceEnd === "" ? "99999999" : priceRange.priceEnd,
		};
		const opt: AxiosRequestConfig = {
			url: `/api/product/categoryName/${category.current}`,
			data,
			method: "PATCH",
		};
		const res = await useRequest(opt);
		const response = res?.data as Product[];
		setProducts(response);
	}

	return (
		<section className="flex flex-col lg:flex-row w-10/12 justify-between gap-16 py-24">
			<div className="filter lg:w-1/4 flex flex-col gap-4">
				<div className="flex justify-between">
					<p className="font-semibold text-xl">Filter:</p>
					<p className="font-medium cursor-pointer" onClick={resetInputs}>
						Reset all
					</p>
				</div>
				<CustomerReview
					setReviewRange={setReviewRange}
					reviewRange={reviewRange}
				/>
				<PriceField
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					fetchData={NewData}
				/>
			</div>
			<div className="flex lg:w-3/4 flex-wrap gap-8 justify-center">
				{productsList}
			</div>
		</section>
	);
}
