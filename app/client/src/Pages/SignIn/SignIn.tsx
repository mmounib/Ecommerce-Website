import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

interface signInProps {
  username: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<signInProps>();

  const submitForm: SubmitHandler<signInProps> = (data) => {
    //! Need To Transfer This Data to The BACKEND Endpoint
    console.log(data);
  };
  return (
    <section className="h-screen w-full bg-sign-in bg-cover bg-gray-500 bg-blend-multiply">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex bg-white p-8 w-[450px] flex-col gap-6">
          <h2 className="text-secondary-color font-extrabold text-4xl">
            Welcome Back !
          </h2>
          <Link
            to={"/"}
            className="border-secondary-color hover:bg-secondary-color hover:text-primary-color rounded-[5px] border-[1px] flex justify-center gap-6 items-center text-xl py-2 px-8"
          >
            <FcGoogle size={35} /> Sign In With Google
          </Link>
          <div className="flex gap-4 items-center mt-10 w-full">
            <span className=" border-b-gray-400 w-full border-[1px]"></span>
            <p className="text-xl">or</p>
            <span className=" border-b-gray-400 w-full border-[1px]"></span>
          </div>
          <form className="mt-4" onSubmit={handleSubmit(submitForm)}>
            <input
              type="text"
              placeholder="Username"
              className="rounded-[10px] w-full py-4 border-secondary-color border-[1px] pl-4"
              {...register("username", { required: true })}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-[10px] w-full py-4 mt-6 border-secondary-color border-[1px] pl-4"
              {...register("username", { required: true })}
            />
            <button
              type="submit"
              className="rounded-[25px] w-full bg-secondary-color text-primary-color inline-block mt-8 py-4 text-lg"
            >
              Sign In
            </button>
          </form>
          <span className="text-lg flex items-center justify-center w-full gap-2">
            Don't have an account ?{" "}
            <Link to={"/register"} className="font-bold text-xl">
              Sign Up
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-center border-[1px] w-[450px] h-[560px] border-secondary-color flex-col gap-4">
          <h3 className="text-3xl font-mediun text-white">Welcome To</h3>
          <h1 className="text-5xl font-extrabold text-white">MarketHub</h1>
          <span className="border-[1px] border-primary-color opacity-50 w-[350px] mt-4 h-[1px] flex"></span>
          <p className="font-light text-xl text-gray-300 capitalize mt-2">Sign in to start shopping</p>

        </div>
      </div>
    </section>
  );
};

export default SignIn;
