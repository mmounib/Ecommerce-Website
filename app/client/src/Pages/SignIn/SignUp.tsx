import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosRequestConfig } from "axios";
import { useRequest } from "../../Hooks/useRequest";
axios.defaults.withCredentials = true;

interface signUpProps {
	email: string;
	username: string;
	password: string;
	rePassword: string;
}

const SignUp = () => {
	const { register, handleSubmit } = useForm<signUpProps>();
	const navigate = useNavigate()

	const submitForm: SubmitHandler<signUpProps> = (dt) => {
		//! Need To Transfer This Data to The BACKEND Endpoint
		const Fetch = async () => {
			const data: AxiosRequestConfig = {
				url: '/api/auth/signup',
				method: 'POST',
				data: {
					email: dt.email,
					username: dt.username,
					password: dt.password,
				}
			}
			const res = await useRequest(data)
			navigate('/')
		}
		void Fetch()
	};
	return (
		<section className="h-screen w-full bg-sign-bg bg-cover bg-gray-500 bg-blend-multiply bg-center">
			<div className="flex justify-center items-center w-full h-full">
				<div className="flex  bg-white p-8 w-[450px] flex-col gap-6">
					<h2 className="text-secondary-color font-extrabold text-4xl">
						Create Account
					</h2>
					<Link
						to={"/"}
						className="border-secondary-color hover:bg-secondary-color hover:text-primary-color rounded-[5px] border-[1px] flex justify-center gap-6 items-center text-xl py-2 px-8"
					>
						<FcGoogle size={35} /> Sign Up With Google
					</Link>
					<div className="flex gap-4 items-center mt-10 w-full">
						<span className=" border-b-gray-400 w-full border-[1px]"></span>
						<p className="text-xl">or</p>
						<span className=" border-b-gray-400 w-full border-[1px]"></span>
					</div>
					<form className="mt-4" onSubmit={handleSubmit(submitForm)}>
						<input
							type="text"
							placeholder="Email"
							className="rounded-[10px] w-full py-4 border-secondary-color border-[1px] pl-4"
							{...register("email", { required: true })}
						/>
						<input
							type="text"
							placeholder="Username"
							className="rounded-[10px] mt-4 w-full py-4 border-secondary-color border-[1px] pl-4"
							{...register("username", { required: true })}
						/>
						<div className="flex gap-4">
							<input
								type="password"
								placeholder="Password"
								className="rounded-[10px] w-full py-4 mt-6 border-secondary-color border-[1px] pl-4"
								{...register("password", { required: true })}
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								className="rounded-[10px] w-full py-4 mt-6 border-secondary-color border-[1px] pl-4"
								{...register("rePassword", { required: true })}
							/>
						</div>
						<button
							type="submit"
							className="rounded-[25px] w-full bg-secondary-color text-primary-color inline-block mt-8 py-4 text-lg"
						>
							Sign Up
						</button>
					</form>
					<span className="text-lg flex items-center justify-center w-full gap-2">
						Already have an account?{" "}
						<Link to={"/sign"} className="font-bold text-xl">
							Sign In
						</Link>
					</span>
				</div>
				<div className="border-[1px] w-[450px] flex justify-center items-center border-secondary-color h-[635px]">
					<div className="flex items-center justify-center  flex-col gap-4">
						<h3 className="text-3xl font-mediun text-white">Welcome To</h3>
						<h1 className="text-5xl font-extrabold text-white">MarketHub</h1>
						<span className="border-[1px] border-primary-color opacity-50 w-[350px] mt-4 h-[1px] flex"></span>
						<p className="font-light text-xl text-gray-300 capitalize mt-2">
							create an account to start shopping
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
