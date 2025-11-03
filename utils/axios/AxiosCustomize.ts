import { CookieCore } from "@/lib/cookie";
import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { KEY_COOKIES } from "@/constants/Cookie";

const createAxiosInstance = (baseUrl: string, tokenKey: string): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: false,
        params: {},
    });

    instance.interceptors.request.use(
        async function (config: InternalAxiosRequestConfig) {
            const token_fososoft = CookieCore.get(KEY_COOKIES.WEBSITE)
            const language = CookieCore.get("language")

            if (token_fososoft !== undefined) {
                config.headers["Authorization"] = "Bearer " + token_fososoft;
            }

            if (language !== undefined) {
                config.headers["Accept-Language"] = language;
            }
            return config;
        },
        function (error: AxiosError) {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response: AxiosResponse) {
            return response;
        },
        async function (error: AxiosError) {
            const status = error.response?.status || 500;
            switch (status) {
                case 401: {
                    if (error.response) {
                        const responseData = error.response.data as any;
                        if (!responseData.result && responseData.code == 401) {
                            CookieCore.remove(tokenKey);
                        }
                        return responseData;
                    }
                    return Promise.reject(error);
                }
                case 403:
                case 400:
                case 404:
                case 409:
                case 422: {
                    return Promise.reject(error);
                }
                default: {
                    const errorMessage = (error.response?.data as { message?: string })?.message;
                    return errorMessage ? errorMessage : Promise.reject(error);
                }
            }
        }
    );

    return instance;
};


const baseUrl = process.env.NEXT_PUBLIC_URL_API as string;

const instanceDefault = createAxiosInstance(baseUrl, KEY_COOKIES.WEBSITE);

export { instanceDefault, axios };
