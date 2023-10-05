import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="h-screen w-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex border-secondary-color border-[1px] p-8 w-[450px] flex-col gap-6">
          <h2 className="text-secondary-color font-extrabold text-4xl">
            Create Account
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
          <form className="mt-4">
            <input
              type="text"
              placeholder="Your Username"
              className="rounded-[10px] w-full py-4 border-secondary-color border-[1px] pl-4"
            />
            <input
              type="password"
              placeholder="Your Password"
              className="rounded-[10px] w-full py-4 mt-6 border-secondary-color border-[1px] pl-4"
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
      </div>
    </section>
  );
};

export default SignUp;
