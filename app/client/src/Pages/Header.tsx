import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import image from "../assets/accessoriesCategory.jpeg";
import trash from "../assets/icons/Trash.png";
import ShoppingList from "../Components/shoppingList";
import UserNav from "../Components/userNav";

export default function Header() {
	const [showList, setShowList] = useState<boolean>(false);
	const allLinks = [
		{ id: nanoid(), to: "/category/kids", value: "kids" },
		{ id: nanoid(), to: `/category/accessories`, value: "accessories" },
		{ id: nanoid(), to: "/category/electronics", value: "electronics" },
		{ id: nanoid(), to: "/category/clothes", value: "clothes" },
	];

	const navbar = allLinks.map((item) => {
		return (
			<Link key={item.id} to={item.to}>
				{item.value}
			</Link>
		);
	});

	const [On, setOn] = useState<boolean>(false);

	const navLinks = allLinks.map((navLink) => {
		return (
			<li className="nav_item my-8" key={navLink.id}>
				<a
					href={navLink.to}
					className="nav_link p-3 text-base font-bold rounded-md hover:bg-primary-color"
				>
					{navLink.value}
				</a>
			</li>
		);
	});

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

	return (
		<header className="flex justify-between items-center text-xl px-8 lg:px-16 xl:px-24 py-7 border-b-2 border-l-gray-400">
			<Link to="/" className="text-2xl font-bold">
				MarketHub
			</Link>
			<ul className="gap-8 hidden md:flex lg:gap-12 xl:gap-16">{navbar}</ul>
			<div className="flex gap-4">
				<UserNav setShowList={setShowList} />
				<HiMenu
					className="menu md:hidden w-6 h-6 cursor-pointer"
					onClick={() => setOn((prev) => !prev)}
				/>
				{On && (
					<nav
						id="mobile-nav"
						className="nav fixed top-0 right-0 bg-secondary-color text-primary-color w-11/12 h-full p-12 z-50 rounded-bl-full"
					>
						{
							<HiOutlineX
								className="absolute top-9 right-4 w-6 h-6 cursor-pointer"
								onClick={() => setOn((prev) => !prev)}
							/>
						}
						<ul className="nav_list flex flex-col items-center justify-center gap-8">
							{navLinks}
						</ul>
					</nav>
				)}
			</div>
			{showList && (
				<ShoppingList
					setShowList={setShowList}
					products={products}
					totalPrice={totalPrice}
				/>
			)}
		</header>
	);
}
