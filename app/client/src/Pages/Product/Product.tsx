import { useState } from "react";
import { useEffectOnUpdate } from "../../Hooks/useEffectOnUpdate";
import { Customer, ProductObject } from "../../interfaces";
import { useParams } from "react-router";
import { AxiosRequestConfig } from "axios";
import { useRequest } from "../../Hooks/useRequest";

const CustomerReview = ({ name, date, text }: Customer) => {
  return (
    <section className="flex items-start flex-col max-w-[500px] gap-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-5 items-start justify-start">
          <img
            src="../../../src/assets/icons/profile.svg"
            alt="profile"
            className="w-[70px] h-[70px]"
          />
          <div className="flex items-start flex-col gap-1">
            <h2 className="font-bold text-2xl">{name}</h2>
            <span className="text-gray-500 font-medium text-base">{date}</span>

            <div className="flex mt-2 max-sm:mt-0 gap-2">
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

            <p className="text-base mt-4 text-left text-secondary-color">
              {text}
            </p>
            {/*if there is no person dont display it*/}
            <span className=" mt-4 font-medium text-base capitalize text-gray-400">
              5 person helped
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface productList {
  title: string;
  price: number;
  quant: number;
  image: string;
}

export default function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [subProduct, setSubProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedColor, setSelectedColor] = useState({});

  useEffectOnUpdate(() => {
    const Fetch = async () => {
      const opt: AxiosRequestConfig = {
        url: `/api/product/productId/${id}`,
        method: "GET",
      };
      const res = await useRequest(opt);
      setProduct(res?.data);
    };
    void Fetch();
  }, []);
  useEffectOnUpdate(() => {
    const Fetch = async () => {
      const opt: AxiosRequestConfig = {
        url: `/api/product/subProductId/${id}`,
        method: "GET",
      };
      const res = await useRequest(opt);
      setSubProduct(res?.data);
    };
    void Fetch();
  }, []);

  const increment = () => {
    if (quantity < 900) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const productColors = subProduct.slice(0, 6);
  const defaultProductColor = `${product?.title} + (${productColors[0]?.title})`;

  const AddingProductToList = async () => {
    const data = {
      productId: id,
      price: selectedColor?.price,
      quantity: quantity,
      image: selectedColor?.image,
    };
    const opt: AxiosRequestConfig = {
      url: `/api/product/cardList`,
      method: "POST",
      data,
    };

    const res = await useRequest(opt);
    console.log(res?.data);
  };

  return (
    <section className="py-24 max-w-[1600px] mx-auto">
      <div className="flex h-full gap-12 w-full justify-center max-w-[1250px] mx-auto">
        <div className="grid grid-cols-base-col gap-4 grid-rows-base-row h-full">
          <div className=" col-span-1 w-[400px] row-span-1">
            {isChecked ? (
              <img
                src={`https://${selectedColor?.image}`}
                alt="productImage"
                className="h-[560px] w-[650px] rounded-[5px]"
              />
            ) : (
              <img
                src={`https://${product?.image}`}
                alt="productImage"
                className="h-[560px] w-[650px] rounded-[5px]"
              />
            )}
          </div>
          <div className=" col-start-2 flex flex-col gap-3">
            {product?.image?.map((si: string, index: number) => (
              <img
                src={`https://${si}`}
                alt="product image"
                className="h-[75px] w-[95px] rounded-[5px]"
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col items-start gap-4">
            {isChecked ? (
              <>
                <h1 className="font-bold leading-10 text-left text-3xl">
                  {product?.title} ({selectedColor?.title})
                </h1>
                <span className=" mt-1 font-medium text-xl text-primary-color bg-blue-600 rounded-[5px] py-2 px-4 italic">
                  ${selectedColor?.price}
                </span>
              </>
            ) : (
              <>
                <h1 className="font-bold leading-10 text-left text-3xl">
                  {defaultProductColor}
                </h1>
                <span className=" mt-1 font-medium text-xl text-primary-color bg-blue-600 rounded-[5px] py-2 px-4 italic">
                  ${subProduct[0]?.price}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-medium text-left text-2xl">Colors</h3>
            <div className="flex gap-6 items-center">
              {productColors.map((color, index) => (
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="radio"
                    key={index + 1}
                    name="Colors"
                    id="color__id"
                    onClick={() => {
                      setIsChecked(true);
                      setSelectedColor(color);
                    }}
                    className=""
                    defaultChecked={color === productColors[0]}
                  />

                  <img
                    src={`https://${color?.image}`}
                    alt="product image"
                    className="h-[45px] w-[45px] rounded-[5px]"
                    key={index}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-medium text-left text-2xl">Quantity</h3>
            {/* <span className=" border-2 border-gray-400 py-1 px-3 font-semibold text-lg">{subProduct[0]?.quantity}</span> */}
            <div className="flex">
              <button
                onClick={decrement}
                className="bg-blue-600 text-white mx-1 py-0 px-2"
              >
                -
              </button>
              <input
                type="number"
                className=" max-w-[50px] border-[1px] text-lg text-center border-gray-500"
                value={quantity}
                min={1}
                max={900}
                onChange={(e) =>
                  setQuantity(Math.min(900, Math.max(1, e.target.value)))
                }
                style={{ appearance: "textfield" }}
              />
              <button
                onClick={increment}
                className="bg-blue-600 text-white mx-1 py-0 px-2"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end w-full h-full">
            <button
              className=" max-w-[500px] rounded-[5px] uppercase py-4 font-medium bg-secondary-color button-1 relative transition-all duration-500 text-primary-color"
              onClick={AddingProductToList}
            >
              Add To Cart
            </button>
            <button className="max-w-[500px] button-2 uppercase font-medium border-secondary-color relative transition-all duration-500 border-[1px] py-4">
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
            <h3 className="text-xl font-semibold mt-2 text-left">
              Overall Rating
            </h3>
            <div className="flex items-center gap-2 pl-2">
              <img
                src="../../../src/assets/icons/fUllStar.svg"
                alt="review start"
                className="w-[40px] h-[40px]"
              />
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
