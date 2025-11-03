import { instanceDefault } from "@/utils/axios/AxiosCustomize";

const apiProjects = {
  async getProjectMenu() {
    return await instanceDefault.get(`/project/get_field`);
  },
  async getProjectCategory() {
    return await instanceDefault.get(`/project/get_category`);
  },

  async getProjectList(params: any) {
    const showAll = process.env.NEXT_PUBLIC_SHOW_ALL || "";
    return await instanceDefault.get(`/project/list?${showAll}`, { params });
  },

  async getProjectListRelatedApp(params: any) {
    return await instanceDefault.get(`/project/list_related_app`, {
      params,
    });
  },

  async getProjectDetail(id: string): Promise<any> {
    const showAll = process.env.NEXT_PUBLIC_SHOW_ALL || "";
    return await instanceDefault.get(`/project/detail/${id}?${showAll}`);
  },
};

export default apiProjects;
