import { nanoid } from "nanoid";
import kidsCategory from "../../assets/kidsCategory.jpeg";
import accessoriesCategory from "../../assets/accessoriesCategory.jpeg";
import clothesCategory from "../../assets/ClothesCategory.jpeg";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { useState } from "react";

export default function Explore() {
  const data = [
    { id: nanoid(), value: "Kids", image: kidsCategory },
    { id: nanoid(), value: "Accessories", image: accessoriesCategory },
    { id: nanoid(), value: "Clothes", image: clothesCategory },
  ];

  const categories = data.map((category) => {
    const [hovered, setIsHovered] = useState(false);
    return (
      <div
        key={category.id}
        className="exploreCard  overflow-hidden card flex-grow flex-wrap w-full max-w-sm relative flex flex-col items-center text-primary-color"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <img
          className={`rounded-lg h-full w-full`}
          src={category.image}
          alt=""
        />
        <div className="absolute w-full h-full bg-black bg-opacity-5"></div>
        <div className="flex flex-col items-center gap-4 absolute bottom-16 w-full">
          <p className="text-center font-bold text-4xl">{category.value}</p>
          {hovered && (
            <div className="overlay">
              <button className="bg-primary-color w-1/2 py-4 flex justify-around items-center text-secondary-color transition-all duration-400">
                <p>Shop Now</p>
                <img src={rightArrow} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });
  return (
    <div className="categories flex h-4/5 gap-4 justify-between w-full mt-auto">
      {categories}
    </div>
  );
}
