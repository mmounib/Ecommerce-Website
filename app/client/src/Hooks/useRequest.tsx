import axios, { AxiosRequestConfig } from "axios";

export const useRequest = async (request: AxiosRequestConfig) => {
	async function refreshAccessToken() {
		try {
			await axios.post("/api/auth/refresh");
		} catch (refreshError: any) {
			window.location.href = "http://localhost:5173/sign";
		}
	}

	async function retryOriginalRequest(originalRequest: any) {
		try {
			// generate new access token using refresh token
			await refreshAccessToken();
			// Retry the original request
			const response = await axios(originalRequest);
			return response;
		} catch (retryError) {
			throw retryError;
		}
	}

	try {
		const response = await axios(request);
		return response;
	} catch (error: any) {
		console.log(error.response.data);
		if (error.response && error.response.status == 401) {
			if (error.response.data.message === "invalid token")
				window.location.href = "http://localhost:5173/sign";
			else {
				const res = await retryOriginalRequest(error.config);
				return res;
			}
		}
	}
};
