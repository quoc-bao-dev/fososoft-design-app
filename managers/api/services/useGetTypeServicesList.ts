import apiServices from "@/services/services/services.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface TypeServicesListParams {
    page?: string | number;
    limit?: string | number;
    language?: string;
}

export const useGetTypeServicesList = ({
    page,
    limit,
    language,
}: TypeServicesListParams = {}) => {
    const fetchTypeServicesList = async () => {
        try {
            const { data } = await apiServices.getTypeServicesList();

            return data.data
        } catch (err) {
            throw err;
        }
    };

    return useQuery({
        queryKey: ["getTypeServicesList"],
        queryFn: fetchTypeServicesList,
        placeholderData: keepPreviousData,
        retry: 3,
        gcTime: 5000,
        retryDelay: 1000,
        staleTime:60000
    });
};
