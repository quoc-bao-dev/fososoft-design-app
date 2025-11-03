import { useQuery } from "@tanstack/react-query";
import apiProducts from "@/services/products/products.services";

export const useGetAppMobile = () => {
    const fetchAppMobile = async () => {
        const { data } = await apiProducts.getAppMobile();
        return data;
    };

    return useQuery({
        queryKey: ['app_mobile'],
        queryFn: fetchAppMobile,
    });
};

export const useGetCloudServer = () => {
    const fetchCloudServer = async () => {
        const { data } = await apiProducts.getCloudServer();
        return data;
    };

    return useQuery({
        queryKey: ['cloud_server'],
        queryFn: fetchCloudServer,
    });
};