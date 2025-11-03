import apiBlogs from "@/services/blogs/blogs.services";
import apiServices from "@/services/services/services.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useBlogsQueryKeys } from '../../query-key/blogs/useBlogsQueryKeys';

interface TypeServicesListParams {
    page?: string | number;
    limit?: string | number;
    language?: string;
}

export const useGetTypeBlogsList = ({
    page,
    limit,
    language,
}: TypeServicesListParams = {}) => {
    const { getListTypeBlog } = useBlogsQueryKeys();
    const { key, options } = getListTypeBlog.list();

    const fetchTypeBlogsList = async () => {
        try {
            const { data } = await apiBlogs.getListTypeBlog();

            return data.data
        } catch (err) {
            throw err;
        }
    };

    return useQuery({
        queryKey: [...key],
        queryFn: fetchTypeBlogsList,
        placeholderData: keepPreviousData,
        retry: 3,
        gcTime: 5000,
        retryDelay: 1000,
        staleTime: 60000,
        ...options,
    });
};
