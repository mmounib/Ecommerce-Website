import { nanoid } from "nanoid";
import kidsCategory from "../../assets/kidsCategory.jpeg";
import accessoriesCategory from "../../assets/accessoriesCategory.jpeg";
import clothesCategory from "../../assets/ClothesCategory.jpeg";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  const data = [
    { id: nanoid(), value: "kids", image: kidsCategory },
    { id: nanoid(), value: "accessories", image: accessoriesCategory },
    { id: nanoid(), value: "clothes", image: clothesCategory },
  ];

  const categories = data.map((category) => {
    const [hovered, setIsHovered] = useState(false);
    return (
      <Link
        to={`/category/${category.value}`}
        key={category.id}
        className="exploreCard overflow-hidden card flex-grow flex-wrap w-full max-w-sm relative flex flex-col items-center text-primary-color"
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
          <p className="textOverlay text-center font-bold text-4xl">{category.value}</p>
          {hovered && (
            <div className="overlay">
              <button className="bg-primary-color w-1/2 py-4 flex justify-around items-center text-secondary-color">
                <p>Shop Now</p>
                <img src={rightArrow} alt="" />
              </button>
            </div>
          )}
        </div>
      </Link>
    );
  });
  return (
    <div className="categories flex h-4/5 gap-4 justify-between w-full mt-auto">
      {categories}
    </div>
  );
}
