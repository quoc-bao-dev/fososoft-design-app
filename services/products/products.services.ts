import { instanceDefault } from "@/utils/axios/AxiosCustomize";

const apiProducts = {
  async getAppMobile() {
    return await instanceDefault.get(`/info_banner_slide`);
  },
  async getCloudServer() {
    return await instanceDefault.get(`/get_cloud_server`);
  },
};

export default apiProducts;
