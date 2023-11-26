import { Link } from "react-router-dom";
import Xmark from "../assets/icons/xMark.svg";
import { nanoid } from "nanoid";
import image from "../assets/accessoriesCategory.jpeg";
import trash from "../assets/icons/Trash.png";
import { useEffect, useState } from "react";
import { useRequest } from "../Hooks/useRequest";
import { AxiosRequestConfig } from "axios";
import { cardList } from "../interfaces";

export default function ShoppingList({
	setShowList,
}: {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}) {

	const [cardList, setCardList] = useState<cardList[]>([]);
	const [isDelete, setIsDelete] = useState(false)

	useEffect(() => {
		const Fetch = async () => {
			const opt: AxiosRequestConfig = {
				url: "/api/product/cardList",
				method: "GET",
			};
			const res = await useRequest(opt);
			setCardList(res?.data);
		};
		Fetch();
	}, [isDelete]);

	async function handleDelete(productId: string | undefined) {
		await useRequest({
			url: `/api/product/cardList/${productId}`,
			method: 'DELETE',
		})
		setIsDelete(prev => !prev)
	}

	let totalPrice: number = 0;

	const products = cardList?.map((item) => {
		const price = Math.floor(item.price * item.quantity * 100) / 100;
		totalPrice += price;
		return (
			<div className="flex gap-8 justify-between w-full" key={item.id}>
				<Link to={`/product/${item.id}`}>
					<img
						className="productCard w-36 h-52 rounded-lg"
						src={`https://${item.image}`}
						alt=""
					/>
				</Link>
				<div className="flex flex-col flex-grow justify-between">
					<div className="flex flex-col items-start">
						<h1 className="text-xl font-medium text-left">{item.title}</h1>
						<p className="text-violet-800 font-medium">{price} MAD</p>
					</div>
					<footer className="flex justify-between">
						<p>quantity : {item.quantity}</p>
						<img className="cursor-pointer" src={trash} alt="" onClick={() => handleDelete(item.id)} />
					</footer>
				</div>
			</div>
		);
	});

	return (
		<div className="absolute top-0 right-0 h-screen w-screen z-10 bg-secondary-color bg-opacity-30">
			<div className="list flex flex-col items-center gap-12 ml-auto w-[600px] h-screen bg-primary-color px-12">
				<header className="flex justify-between items-center w-full font-semibold text-2xl py-8 border-b-2 border-gray-300">
					<p>Shopping List</p>
					<img
						className="cursor-pointer"
						src={Xmark}
						alt=""
						onClick={() => setShowList(false)}
					/>
				</header>
				<figure className="w-full flex flex-col gap-8 h-full overflow-x-hidden overflow-y-scroll">
					{products}
				</figure>
				<Link
					to="/payment"
					className="w-full py-4 rounded-lg mb-12 bg-secondary-color text-primary-color"
					onClick={() => setShowList(false)}
				>
					Check Out - {Math.floor(totalPrice * 100) / 100} MAD
				</Link>
			</div>
		</div>
	);
}
