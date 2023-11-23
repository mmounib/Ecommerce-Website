import axios, { AxiosRequestConfig } from "axios";

export const useRequest = async (request: AxiosRequestConfig) => {
  async function refreshAccessToken() {
    try {
      await axios.post("/api/auth/refresh");
    } catch (err) {
      window.location.href = "http://localhost:5173/sign";
    }
  }

  async function retryOriginalRequest(originalRequest: any) {
    try {
      await refreshAccessToken();
      const response = await axios(originalRequest);
      return response;
    } catch (retryError) {
      console.log(retryError);
    }
  }

  try {
    const response = await axios(request);
    return response;
  } catch (error: any) {
    if (error.response && error.response.status == 401) {
      if (error.response.data.message === "invalid token")
        window.location.href = "http://localhost:5173/sign";
      else if (error.response.data.message === "expired token") {
        const res = await retryOriginalRequest(error.config);
        return res;
      }
    }
  }
};
