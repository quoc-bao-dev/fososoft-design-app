//lấy danh sách dự án chi tiết
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiProjects from "@/services/projects/projects.services";

export const useGetProjectDetail = (id: string) => {
    const fetchProjectDetail = async () => {
        const { data } = await apiProjects.getProjectDetail(id);
        return data.data;
    };

    return useQuery({
        queryKey: ["projectDetail", id],
        queryFn: fetchProjectDetail,
        placeholderData: keepPreviousData,
        retry: 3,
        gcTime: 5000,
    });
};