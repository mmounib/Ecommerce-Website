import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useEffectOnUpdate } from "../../Hooks/useEffectOnUpdate";
import { AxiosRequestConfig } from "axios";
import CustomerReview from "./customerReview";
import PriceField from "./priceField";
import { priceRange } from "../../interfaces";
import { useRequest } from "../../Hooks/useRequest";
import { Product } from "../../../../server/dist/Types/types";
import { FilterdData } from "../../interfaces";

export default function Category() {
  const category = useRef<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [reviewRange, setReviewRange] = useState<number>(0);
  const reset = useRef<boolean>(false);
  const [priceRange, setPriceRange] = useState<priceRange>({
    priceStart: "",
    priceEnd: "",
  });
  const { pathname } = useLocation();
  const match = pathname.match(/\/category\/(.+)/);
  if (match) category.current = match[1];

  function resetInputs() {
    setReviewRange(0);
    setPriceRange({ priceStart: "", priceEnd: "" });
    reset.current = !reset.current;
  }

  useEffect(() => {
    resetInputs();
  }, [category.current]);

  async function NewData() {
    const data: FilterdData = {
      stars: reviewRange,
      priceStart: priceRange.priceStart === "" ? "0" : priceRange.priceStart,
      priceEnd: priceRange.priceEnd === "" ? "99999999" : priceRange.priceEnd,
    };
    const opt: AxiosRequestConfig = {
      url: `/api/product/${category.current}`,
      data,
      method: "PATCH",
    };
    const res = await useRequest(opt);
    console.log(res?.data);
    const response = res?.data as Product[];
    setProducts(response);
  }

  useEffectOnUpdate(() => {
    const FetchProducts = async () => {
      const opt: AxiosRequestConfig = {
        url: `/api/product/${category.current}`,
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
						src={`https://${item.image[0]}`}
						alt=""
					/>
				</Link>
				<div>
					<h1 className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
						{item.title}
					</h1>
					<p className="text-left text-violet-800 font-medium">{item.price}</p>
				</div>
			</div>
		);
	});
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
