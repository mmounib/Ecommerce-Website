import React, { useLayoutEffect, useState } from "react";
import shoppingList from "../assets/icons/shoppingList.svg";
import profile from "../assets/icons/profile.svg";
import { User } from "../interfaces";
import { AxiosRequestConfig } from "axios";
import { useRequest } from "../Hooks/useRequest";
import { useNavigate } from "react-router";

export default function UserNav({
	setShowList,
}: {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [user, setUser] = useState<User>({} as User);
	const navigate = useNavigate();

	useLayoutEffect(() => {
		const fetchUser = async () => {
			const opt: AxiosRequestConfig = {
				url: "/api/user",
				method: "GET",
			};
			const res = await useRequest(opt);
			if (res) {
                const data = res.data as User;
				setUser(data);
			}
		};
		void fetchUser();
	}, []);

	const userNav = (
		<>
			<img
				className="w-6 h-6 cursor-pointer"
				src={shoppingList}
				alt=""
				onClick={() => setShowList(true)}
			/>
            <img className="w-6 h-6 cursor-pointer" src={profile} alt="" onClick={() => {
                navigate('/profile')
            }}/>
		</>
	);

	const noUserNav = (
		<>
			<button
				className="borde border-2 border-gray-600 px-4 py-1 rounded-xl"
				onClick={() => {
					navigate("/sign");
				}}
			>
				Log in
			</button>
			<button
				className="text-zinc-50 bg-violet-800 px-4 py-1 rounded-xl"
				onClick={() => {
					navigate("/register");
				}}
			>
				Sign up
			</button>
		</>
    );

	return user?.id ? userNav : noUserNav;
}
