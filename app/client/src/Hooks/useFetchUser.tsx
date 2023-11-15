import { AxiosRequestConfig } from 'axios';
import { useLayoutEffect, useState } from 'react'
import { User } from '../interfaces';
import { useRequest } from './useRequest';

export default function useFetchUser() {

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
  return user
}