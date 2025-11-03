import { useStatePageContactUs } from "@/app/(client)/contact-us/_state/useStatePageContactUs";
import { useStateComponentContact } from "@/managers/state/contact/useStateComponentContact";
import apiContacts from "@/services/contacts/contacts.services";
import { useAuthStore } from "@/stores/useAuthStores";
import { useToastStore } from "@/stores/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostContactFososoft = (form: any) => {
    const { informationUser } = useAuthStore();
    const queryClient = useQueryClient()
    const { queryKeyIsStateComponentContact } = useStateComponentContact()

    const queryKey = ['getTypeServicesList'];
    const serviceData = queryClient.getQueryData<any[]>(queryKey) || []; // Ép kiểu về dạng mảng các service

    const { setToast } = useToastStore();

    const postContactFososoftMutation = useMutation({
        mutationFn: async (formData: any) => {
            const { data } = await apiContacts.postContactFososoft(formData);
            return data;
        },
        onSuccess: (data) => {
            if (data && data?.result) {
                form.reset()
                if (serviceData && serviceData?.length > 0) {
                    form.setValue("service", serviceData[0]?.id);
                }

                queryKeyIsStateComponentContact({
                    tokenCaptcha: "",
                    tokenChecked: false
                })

                setToast(true, "success", data?.message);
                return;
            }
            setToast(true, "error", data?.message);
        },
        onError: (error) => {
            throw error;
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const dataSubmit = {
                fullname: data?.fullname ?? "",   // họ tên
                phone: data?.phone ?? "",  // số điện thoại
                email: data?.email ?? "", // email
                name_company: data?.name_company ?? "", // tên tổ chức công ty
                name_role: data?.role?.value, //chức vụ
                type_service_id: data?.service,  //loại dịch vụ
                content: data?.description ?? ""  // chia sẻ nhu cầu
            }

            postContactFososoftMutation.mutate(dataSubmit);
        } catch (error) {
            throw error;
        }
    };

    return { onSubmit, isLoading: postContactFososoftMutation.isPending };
};
