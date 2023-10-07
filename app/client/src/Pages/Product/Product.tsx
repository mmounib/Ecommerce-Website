import React from "react";

interface customer {
  name: string;
  date: string;
  text: string;
}

const CustomerReview = ({ name, date, text }: customer) => {
  return (
    <section className="flex items-start flex-col max-w-[400px] gap-2">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <img
            src="../../../src/assets/icons/profile.svg"
            alt="profile"
            className="w-[90px] h-[90px]"
          />
          <div className="flex items-start flex-col gap-1">
            <h2 className="font-bold text-2xl">{name}</h2>
            <span className="text-gray-500 font-medium text-base">{date}</span>
          </div>
        </div>
        <div className="flex ml-auto gap-2">
          <img
            src="../../../src/assets/icons/fUllStar.svg"
            alt="reviews"
            className="w-[30px] h-[30px]"
          />
          <img
            src="../../../src/assets/icons/fUllStar.svg"
            alt="reviews"
            className="w-[30px] h-[30px]"
          />
          <img
            src="../../../src/assets/icons/fUllStar.svg"
            alt="reviews"
            className="w-[30px] h-[30px]"
          />
          <img
            src="../../../src/assets/icons/fUllStar.svg"
            alt="reviews"
            className="w-[30px] h-[30px]"
          />
        </div>
        <p className="text-base font-light text-gray-600">{text}</p>
      </div>
    </section>
  );
};

export default function Product() {
  return (
    <section className="py-24 max-w-[1600px] mx-auto">
      <div className="flex items-start gap-44 max-w-[1100px] mx-auto">
        <img
          src="../../../src/assets/accessoriesCategory.jpeg"
          alt="product image"
          className="h-[560px] w-[450px]"
        />
        <div className="flex flex-col gap-10 flex-grow h-full">
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-extrabold text-6xl">Product 1</h1>
            <span className="font-medium text-lg text-primary-color bg-blue-600 rounded-[5px] py-2 px-4 italic">
              450.00 MAD
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <button className="inline-block uppercase py-4 font-medium bg-secondary-color button-1 relative transition-all duration-500 text-primary-color">
              Add To Cart
            </button>
            <button className="inline-block button-2 uppercase font-medium border-secondary-color relative transition-all duration-500 border-[1px] py-4">
              Favorite
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1300px] mx-auto gap-6">
        <span className="w-full flex h-[2px] mt-32 border-[1px] border-gray-300"></span>
        <h1 className="font-extrabold text-4xl text-left mt-8">
          Customer Reviews (42)
        </h1>
        <div className="flex flex-row-reverse h-full w-full justify-between mt-12">
          <div className="flex border-[1px] h-[350px] w-[380px] px-4 py-2 border-secondary-color shadow-md shadow-gray-400 flex-col gap-6">
            <h3 className="text-xl font-semibold mt-2 text-left">Overall Rating</h3>
            <div className="flex items-center gap-2 pl-2">
              <img src="../../../src/assets/icons/fUllStar.svg" alt="review start" className="w-[40px] h-[40px]"/>
              <span className="font-semibold text-4xl">4.7</span>
            </div>
          </div>
          <div className="flex flex-col gap-6 overflow-scroll">
            <CustomerReview
              name="Mouad Mounib"
              date="10 august 2021"
              text="Pretium hac tristique quis eu sem tellus diam ultricies. Id sed pellentesque pulvinar sed diam neque curabitur eleifend non."
            />
            <CustomerReview
              name="Oouazize Mouad"
              date="2 july 2005"
              text="Pretium hac tristique quis eu sem tellus diam ultricies. Id sed pellentesque pulvinar sed diam neque curabitur eleifend non."
            />
            <CustomerReview
              name="Oussama Ouazize"
              date="24 april 2015"
              text="Pretium hac tristique quis eu sem tellus diam ultricies. Id sed pellentesque pulvinar sed diam neque curabitur eleifend non."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
