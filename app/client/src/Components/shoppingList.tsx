import { Link } from "react-router-dom";
import Xmark from "../assets/icons/xMark.svg";

export default function ShoppingList({
	setShowList,
	products,
	totalPrice,
}: {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	products: JSX.Element[];
	totalPrice: number;
}) {
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
