import axios, { AxiosRequestConfig } from "axios";
axios.defaults.withCredentials = true;

async function refreshAccessToken(message: string) {
	try {
		await axios.post("/api/auth/refresh");
	} catch (err) {
		if (message === 'expired token')
      window.location.href = "http://localhost:5173/sign";
	}
}

async function retryOriginalRequest(originalRequest: any, message: string) {
	try {
		await refreshAccessToken(message);
		const response = await axios(originalRequest);
		return response;
	} catch (retryError) {
		console.log(retryError);
	}
}

export const useRequest = async (request: AxiosRequestConfig) => {
	try {
		const response = await axios(request);
		return response;
	} catch (error: any) {
		console.log(error.response);
		if (error.response) {
			const [message, status] = [
				error.response.data.message,
				error.response.status,
      ];
			if (status == 401) {
				if (message === "invalid token")
					window.location.href = "http://localhost:5173/sign";
				else {
					const res = await retryOriginalRequest(error.config, message);
					return res;
				}
			}
		}
	}
};
