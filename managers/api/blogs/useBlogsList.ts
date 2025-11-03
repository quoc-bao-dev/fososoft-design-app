import apiBlogs from "@/services/blogs/blogs.services";
import { useQuery } from "@tanstack/react-query";
import { useBlogsQueryKeys } from '../../query-key/blogs/useBlogsQueryKeys';

type BlogsListProps = {
    limit: number,
    page: number,
    typeBlog?: any,
    search?: string
    idBlog?: string | any | number
    enabled?: boolean
}

export const useBlogsList = ({ limit, page, typeBlog, search, idBlog, enabled = false }: BlogsListProps) => {
    console.log('check idBlog: ', idBlog);

    const { getListBlogs } = useBlogsQueryKeys();
    const { key, options } = getListBlogs.list({ page, typeBlog, search, idBlog });

    const fetchBlogsList = async () => {
        try {
            const dataSubmit: any = {}; // hoặc cụ thể kiểu nếu muốn
            if (typeBlog && typeBlog.id !== 0) {
                dataSubmit.type_blog = [typeBlog.id];
            }

            if (search) {
                dataSubmit.search = search;
            }

            if (idBlog) {
                dataSubmit.id = idBlog;
            }
            const { data } = await apiBlogs.getListBlogs(page, limit, dataSubmit);

            return data
        } catch (err) {
            throw err;
        }
    };

    return useQuery({
        queryKey: [...key],
        queryFn: fetchBlogsList,
        retry: 3,
        gcTime: 5000,
        enabled: enabled,
        ...options, // Dùng options chung từ `queryKeys`
    });
};
