import apiBlogs from "@/services/blogs/blogs.services";
import apiServices from "@/services/services/services.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface TypeServicesListParams {
    slug?: string | number | string[] | any;
    language?: string;
}

export const useGetDataDetailBlog = ({
    slug,
    language,
}: TypeServicesListParams = {}) => {
    const fetchDataDetailBlog = async () => {
        try {
            const dataSubmit = {

            }


            const { data } = await apiBlogs.getDetailBlog(slug, dataSubmit);

            return data.data
        } catch (err) {
            throw err;
        }
    };

    return useQuery({
        queryKey: ["getDetailBlog", slug],
        queryFn: fetchDataDetailBlog,
        placeholderData: keepPreviousData,
        retry: 3,
        gcTime: 5000,
        retryDelay: 1000,
        staleTime: 60000
    });
};
