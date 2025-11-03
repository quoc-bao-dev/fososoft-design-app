import { instanceDefault } from "@/utils/axios/AxiosCustomize";;

const apiContacts = {
    // Post form contact foso
    async postContactFososoft(data: any): Promise<any> {
        return await instanceDefault.post(`/send_contact`, data);
    },
};

export default apiContacts;
