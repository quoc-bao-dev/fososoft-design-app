
export const useBlogsQueryKeys = () => {

    return {
        getListBlogs: {
            list: (filter = {}) => ({
                key: ["getListBlog", { ...filter }],
                options: {
                },
            }),
        },
        getListTypeBlog: {
            list: (filter = {}) => ({
                key: ["getListTypeBlog", { ...filter }],
                options: {
                },
            }),
        },
        getDetailBlog: {
            list: (filter = {}) => ({
                key: ["getDetailBlog", { ...filter }],
                options: {
                },
            }),
        },
    };
};
