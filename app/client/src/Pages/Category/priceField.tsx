import { priceRange } from "../../interfaces";

interface propType {
	priceRange: priceRange;
	setPriceRange: (newPriceRange: priceRange) => void;
	fetchData: () => void;
}

export default function PriceField({
	priceRange,
	setPriceRange,
	fetchData,
}: propType) {
	function handleChange(event: { target: { name: string; value: string } }) {
		const { name, value } = event.target;
		setPriceRange({
			...priceRange,
			[name]: value,
		});
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault(); // Prevent the default form submission behavior
		fetchData();
	};

	const inputStyle = "w-1/2 rounded-lg pl-4 p-2 border-2 border-gray-300";
	const borderStyle =
		"border-2 border-secondary-color rounded-lg hover:bg-secondary-color hover:text-primary-color py-2";

	return (
		<figure className="flex flex-col w-full">
			<div className="border-t-2 border-l-gray-400 w-full my-4"></div>
			<h1 className="mr-auto font-semibold text-xl">Price</h1>
			<form className="flex flex-col gap-4 w-full mt-4">
				<div className="flex gap-2">
					<input
						className={inputStyle}
						type="number"
						placeholder="Start"
						name="priceStart"
						value={priceRange.priceStart}
						onChange={handleChange}
					/>
					<input
						className={inputStyle}
						type="number"
						placeholder="End"
						name="priceEnd"
						value={priceRange.priceEnd}
						onChange={handleChange}
					/>
				</div>
				<button className={borderStyle} onClick={handleSubmit}>
					Save
				</button>
			</form>
		</figure>
	);
}
