import { Link } from "react-router-dom";
import Xmark from "../assets/icons/xMark.svg";
import { nanoid } from 'nanoid';
import image from "../assets/accessoriesCategory.jpeg";
import trash from "../assets/icons/Trash.png";
import { useState } from "react";

export default function ShoppingList({
	setShowList,
}: {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	}) {
		const data = [
			{ itemId: nanoid(), title: "Product 1", image: image, price: "250" },
			{ itemId: nanoid(), title: "Product 1", image: image, price: "250" },
			{ itemId: nanoid(), title: "Product 1", image: image, price: "250" },
			{ itemId: nanoid(), title: "Product 1", image: image, price: "250" },
			{ itemId: nanoid(), title: "Product 1", image: image, price: "250" },
		];
	
		const [number, setNumber] = useState<number>(1);
	
		const totalPrice = 500;
	
		const products = data.map((item) => {
			return (
				<div className="flex gap-8 justify-between w-full" key={item.itemId}>
					<Link to={`/product/${item.itemId}`}>
						<img
							className="productCard w-36 h-52 rounded-lg"
							src={item.image}
							alt=""
						/>
					</Link>
					<div className="flex flex-col flex-grow justify-between">
						<div className="flex flex-col items-start">
							<h1 className="text-2xl font-semibold">{item.title}</h1>
							<p className="text-violet-800 font-medium">{item.price}.00MAD</p>
						</div>
						<footer className="flex justify-between">
							<div className="flex justify-center items-center h-10 border-2 border-gray-300 text-gray-300">
								<div
									className="w-10 cursor-pointer"
									onClick={() => setNumber((prev) => prev - 1)}
								>
									-
								</div>
								<div className="w-10 border-x-2 text-secondary-color">
									{number}
								</div>
								<div
									className="w-10 cursor-pointer"
									onClick={() => setNumber((prev) => prev + 1)}
								>
									+
								</div>
							</div>
							<img src={trash} alt="" />
						</footer>
					</div>
				</div>
			);
		});
		console.log("ShoppingList re-render")
	
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
					Check Out - {totalPrice} MAD
				</Link>
			</div>
		</div>
	);
}
