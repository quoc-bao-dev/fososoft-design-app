import { instanceDefault } from "@/utils/axios/AxiosCustomize";;
import { AxiosRequestConfig } from "axios";

const apiBlogs = {
    // get type category
    async getListTypeBlog(): Promise<any> {
        return await instanceDefault.get(`/category/getListTypeBlog`);
    },

    // get list blog
    async getListBlogs(page: string | number = 1, limit: string | number = 10, param?: any): Promise<any> {
        let config: AxiosRequestConfig = {
            params: {
                ...param,
            },
        };
        const showAll = process.env.NEXT_PUBLIC_SHOW_ALL || "";
        return await instanceDefault.get(`/blog/getListBlog?current_page=${page}&per_page=${limit}&${showAll}`, config);
    },

    // get detail blog
    async getDetailBlog(id: string | any, data?: any): Promise<any> {
        return await instanceDefault.get(`/blog/getDetail/${id}`, data);
    },
};

export default apiBlogs;
