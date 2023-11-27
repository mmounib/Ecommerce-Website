import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react'
import { cardList } from '../interfaces';
import { useRequest } from '.';

export function useFetchCardList() {

	const [cardList, setCardList] = useState<cardList[]>([]);
	const [isDelete, setIsDelete] = useState(false)

	useEffect(() => {
		const Fetch = async () => {
			const opt: AxiosRequestConfig = {
				url: "/api/product/cardList",
				method: "GET",
			};
			const res = await useRequest(opt);
			setCardList(res?.data);
		};
		Fetch();
	}, [isDelete]);
	return {cardList, setIsDelete}
}
