import React, { useLayoutEffect, useState } from "react";
import shoppingList from "../assets/icons/shoppingList.svg";
import profile from "../assets/icons/profile.svg";
import { User } from "../interfaces";
import { AxiosRequestConfig } from "axios";
import { useRequest } from "../Hooks/useRequest";
import { Link } from "react-router-dom";

export default function UserNav({
	setShowList,
}: {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [user, setUser] = useState<User>({} as User);

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
			<Link to="/profile">
				<img className="w-6 h-6 cursor-pointer" src={profile} alt="" />
			</Link>
		</>
	);

	const noUserNav = (
		<>
			<Link
				to="/sign"
				className="borde border-2 border-gray-600 px-4 py-1 rounded-xl"
			>
				Log in
			</Link>
			<Link
				to="/register"
				className="text-zinc-50 bg-violet-800 px-4 py-1 rounded-xl"
			>
				Sign up
			</Link>
		</>
	);

	return user?.id ? userNav : noUserNav;
}
